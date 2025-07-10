// Definir Constantes y Variables Globales
const MODEL_PATH = 'tfjs_asl_model/model.json'; // Ruta al modelo convertido
const LABELS_PATH = 'labels.json';             // Ruta a las etiquetas
const IMAGE_SIZE = 100;                         // Debe coincidir con el tamaño de entrenamiento

let model;
let labels;

// Obtener Referencias a los Elementos del DOM
const imageSelector = document.getElementById('image-selector');
const predictButton = document.getElementById('predict-button');
const selectedImage = document.getElementById('selected-image');
const predictionResult = document.getElementById('prediction-result');
const status = document.getElementById('status');

// Función Principal de Carga
async function initializeApp() {
    try {
        // Cargar el modelo de TensorFlow.js
        model = await tf.loadLayersModel(MODEL_PATH);
        // Calentar el modelo (hacer una predicción vacía para inicializarlo)
        model.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])).dispose();

        // Cargar el archivo de etiquetas
        const response = await fetch(LABELS_PATH);
        labels = await response.json();

        // Habilitar los controles una vez que todo está cargado
        status.innerText = 'Por favor, selecciona una imagen.';
        predictButton.disabled = false;
        predictButton.innerText = 'Predecir Seña';
        console.log("Modelo y etiquetas cargados exitosamente.");

    } catch (error) {
        console.error("Error al inicializar la aplicación:", error);
        status.innerText = 'Error al cargar el modelo de IA. Revisa la consola.';
    }
}

// Manejar la Selección de Imagen
imageSelector.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    
    // Convertir el archivo a una URL de datos para mostrarlo en la etiqueta <img>
    const reader = new FileReader();
    reader.onload = e => {
        selectedImage.src = e.target.result;
        selectedImage.style.display = 'block'; // Hacer visible la imagen
        predictionResult.innerHTML = `<p id="status">Imagen lista. ¡Haz clic en predecir!</p>`;
    };
    reader.readAsDataURL(file);
});

// Realizar la Predicción
predictButton.addEventListener('click', async () => {
    if (!selectedImage.src || selectedImage.src.endsWith('#')) {
        alert("Por favor, selecciona una imagen primero.");
        return;
    }

    status.innerText = 'Analizando...';

    // Preprocesar la imagen y hacer la predicción
    try {
        // tf.tidy() ayuda a limpiar la memoria de los tensores intermedios
        const prediction = tf.tidy(() => {
            // 1. Convertir la imagen a un tensor
            const imgTensor = tf.browser.fromPixels(selectedImage);
            // 2. Redimensionar al tamaño esperado por el modelo
            const resizedTensor = tf.image.resizeBilinear(imgTensor, [IMAGE_SIZE, IMAGE_SIZE]);
            // 3. Normalizar los valores de los píxeles a [0, 1]
            const normalizedTensor = resizedTensor.div(255.0);
            // 4. Añadir una dimensión de lote (batch dimension)
            const batchedTensor = normalizedTensor.expandDims(0);
            
            // 5. Realizar la predicción
            return model.predict(batchedTensor);
        });

        // Obtener los datos de la predicción
        const predictionData = await prediction.data();
        prediction.dispose(); // Liberar memoria del tensor de predicción

        // Encontrar el índice de la clase con la probabilidad más alta
        const maxProbIndex = predictionData.indexOf(Math.max(...predictionData));
        const predictedClass = labels[maxProbIndex];
        const confidence = (Math.max(...predictionData) * 100).toFixed(2);
        
        // Mostrar el resultado final
        predictionResult.innerHTML = `La seña es: <strong>${predictedClass.toUpperCase()}</strong><br>Confianza: ${confidence}%`;
        status.innerText = 'Análisis completado. Puedes probar con otra imagen.';

    } catch (error) {
        console.error("Error durante la predicción:", error);
        status.innerText = 'Ocurrió un error al predecir.';
    }
});

// Iniciar la Aplicación al Cargar la Página
initializeApp();