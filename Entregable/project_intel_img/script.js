// 1. OBTENER REFERENCIAS A LOS ELEMENTOS HTML
const status = document.getElementById('status');
const imageSelector = document.getElementById('image-selector');
const selectedImage = document.getElementById('selected-image');
const predictionsDiv = document.getElementById('predictions');

// 2. DEFINIR CONSTANTES
const IMG_SIZE = 150; // ¡Debe ser el mismo tamaño que en Python!
const MODEL_PATH = './modelo_tfjs/model.json';
// ¡Las clases deben estar en el mismo orden que se imprimió en Python!
const CLASSES = ['buildings', 'forest', 'glacier', 'mountain', 'sea', 'street'];

let model;

// 3. FUNCIÓN PARA CARGAR EL MODELO
async function loadModel() {
    try {
        model = await tf.loadGraphModel(MODEL_PATH);
        // Calentar el modelo (hacer una predicción vacía para que la primera sea más rápida)
        model.predict(tf.zeros([1, IMG_SIZE, IMG_SIZE, 3])).dispose();
        status.innerText = 'Modelo cargado. ¡Sube una imagen!';
        imageSelector.disabled = false;
    } catch (e) {
        status.innerText = 'Error al cargar el modelo.';
        console.error(e);
    }
}

// 4. ESCUCHAR CAMBIOS EN EL SELECTOR DE IMÁGENES
imageSelector.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;

    // Leer y mostrar la imagen
    const reader = new FileReader();
    reader.onload = e => {
        selectedImage.src = e.target.result;
        selectedImage.style.display = 'block';
        // Una vez cargada la imagen, hacer la predicción
        predict(selectedImage);
    }
    reader.readAsDataURL(file);
});

// 5. FUNCIÓN PARA HACER LA PREDICCIÓN
async function predict(imageElement) {
    status.innerText = 'Prediciendo...';
    predictionsDiv.innerText = '';

    // Pre-procesar la imagen (convertir a tensor, redimensionar, normalizar)
    const tensor = tf.browser.fromPixels(imageElement)
        .resizeBilinear([IMG_SIZE, IMG_SIZE])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();

    // Realizar la predicción
    const predictions = await model.predict(tensor).data();
    
    // Formatear los resultados
    const results = Array.from(predictions)
        .map((prob, i) => ({ probability: prob, className: CLASSES[i] }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 3); // Tomar las 3 predicciones más altas

    // Mostrar los resultados
    let resultHTML = "<strong>Predicciones:</strong><ul>";
    results.forEach(r => {
        resultHTML += `<li>${r.className}: ${(r.probability * 100).toFixed(2)}%</li>`;
    });
    resultHTML += "</ul>";
    predictionsDiv.innerHTML = resultHTML;

    status.innerText = 'Sube otra imagen para clasificar.';
}

// Iniciar todo
loadModel();