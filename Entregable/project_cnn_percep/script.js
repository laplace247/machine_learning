// Esperar a que todo el HTML esté cargado para empezar
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. OBTENER REFERENCIAS A LOS ELEMENTOS HTML
    const celsiusSlider = document.getElementById('celsius-slider');
    const celsiusLabel = document.getElementById('celsius-label');
    const resultText = document.getElementById('result-text');

    // 2. DEFINIR CONSTANTES
    const MODEL_PATH = './model_tfjs/model.json';
    let model;

    // 3. FUNCIÓN PARA CARGAR EL MODELO
    async function loadModel() {
        console.log("Cargando modelo...");
        resultText.innerText = "Cargando cerebro entrenado...";
        try {
            model = await tf.loadLayersModel(MODEL_PATH);
            console.log("Modelo cargado exitosamente.");
            // Una vez cargado, hacer la primera predicción con el valor inicial del slider
            updatePrediction(); 
        } catch (e) {
            console.error("Error al cargar el modelo:", e);
            resultText.innerText = "Error al cargar modelo.";
        }
    }

    // 4. FUNCIÓN PARA ACTUALIZAR Y PREDECIR
    function updatePrediction() {
        if (!model) {
            // Si el modelo aún no está listo, no hacer nada
            return;
        }

        // Obtener el valor actual del slider
        const celsius = parseFloat(celsiusSlider.value);
        
        // Actualizar la etiqueta que muestra el valor de Celsius
        celsiusLabel.textContent = `Grados Celsius: ${celsius}`;

        // Usar tf.tidy para limpiar la memoria automáticamente
        tf.tidy(() => {
            // Crear el tensor de entrada
            const inputTensor = tf.tensor2d([[celsius]]);
            
            // Realizar la predicción
            const prediction = model.predict(inputTensor);
            
            // Obtener el resultado numérico
            const fahrenheit = prediction.dataSync()[0];

            // Mostrar el resultado final formateado
            resultText.innerHTML = `${celsius} celsius son <strong>${fahrenheit.toFixed(0)}</strong> fahrenheit!`;
        });
    }

    // 5. EVENT LISTENER
    // Añadir un "escuchador" al slider para que llame a la función cada vez que se mueva
    celsiusSlider.addEventListener('input', updatePrediction);

    // Iniciar todo el proceso
    loadModel();
});