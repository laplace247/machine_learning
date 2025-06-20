// --- Seleccionamos los elementos del DOM que vamos a manipular ---
const imageSelector = document.getElementById('image-selector');
const imagePreview = document.getElementById('image-preview');
const predictionDiv = document.getElementById('prediction');
const uploaderLabel = document.getElementById('uploader-label');

// --- Constantes para nuestro modelo ---
const MODEL_PATH = './modelo_tfjs/model.json';
const IMAGE_SIZE = 180; // Debe ser el mismo tamaño que en el entrenamiento (180x180)

// Este array debe tener los nombres de las flores
// en el mismo orden que se usó durante el entrenamiento en Colab.
const CLASS_NAMES = ['daisy', 'dandelion', 'rose', 'sunflower', 'tulip']; 

// Variable global para almacenar el modelo una vez cargado
let model;

// --- Funciones Principales ---

// 1. Cargar el modelo de TensorFlow.js
const loadModel = async () => {
    console.log("Cargando modelo...");
    predictionDiv.innerText = 'Cargando modelo...';
    try {
        model = await tf.loadLayersModel(MODEL_PATH);
        console.log("Modelo cargado exitosamente.");
        predictionDiv.innerText = 'Sube una imagen para clasificar.';
    } catch (error) {
        console.error("Error al cargar el modelo:", error);
        predictionDiv.innerText = 'Error al cargar el modelo. Revisa la consola (F12).';
        // Cambiamos el color a rojo para indicar un error
        predictionDiv.style.color = '#dc3545';
        predictionDiv.style.backgroundColor = '#f8d7da';
    }
};

// 2. Predecir la clase de una imagen
const predictImage = async (imgElement) => {
    if (!model) {
        console.log("El modelo aún no está cargado.");
        return;
    }

    predictionDiv.innerText = 'Analizando imagen...';

    // Preprocesamiento de la imagen: convertirla a un tensor y ajustar el tamaño
    const tensor = tf.browser.fromPixels(imgElement)
        .resizeNearestNeighbor([IMAGE_SIZE, IMAGE_SIZE])
        .toFloat()
        .expandDims(); // Añadir dimensión de lote (batch dimension)

    // Realizar la predicción
    const predictions = await model.predict(tensor).data();
    
    // Encontrar el índice con la probabilidad más alta
    const topPredictionIndex = predictions.indexOf(Math.max(...predictions));
    const predictedClass = CLASS_NAMES[topPredictionIndex];
    const confidence = Math.round(predictions[topPredictionIndex] * 100);

    // Mostrar el resultado final
    predictionDiv.innerText = `${predictedClass} (${confidence}% de confianza)`;
};

// 3. Manejar el evento cuando el usuario selecciona un archivo
imageSelector.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            // Mostrar la vista previa de la imagen
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';

            // Ocultar el botón para que no estorbe
            uploaderLabel.style.display = 'none';

            // Una vez que la imagen esté cargada en el elemento <img>, predecir
            imagePreview.onload = () => predictImage(imagePreview);
        };
        reader.readAsDataURL(file);
    }
});

// --- Iniciar la Aplicación ---
// Llamamos a `loadModel` tan pronto como el script se ejecuta.
loadModel();