# Conversor de Celsius a Fahrenheit con M.Learning (TensorFlow.js)

Este proyecto es una aplicación web interactiva que utiliza un modelo de red neuronal simple, entrenado con TensorFlow, para predecir la conversión de grados Celsius a Fahrenheit. El modelo se ejecuta completamente en el navegador del cliente gracias a TensorFlow.js.

El objetivo principal es demostrar un ciclo completo de Machine Learning:
1.  **Entrenamiento:** Crear y entrenar un modelo de regresión lineal en Python con Keras.
2.  **Exportación:** Convertir el modelo de Keras a un formato compatible con la web.
3.  **Despliegue:** Crear una interfaz de usuario (UI) en HTML, CSS y JavaScript para interactuar con el modelo en tiempo real.

## Cómo Probar la Aplicación

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1.  **Clonar o Descargar el Repositorio:**
    Obtén todos los archivos del proyecto ( `index.html`, `style.css`, `script.js` y la carpeta `model_tfjs`).

2.  **Navegar a la Carpeta del Proyecto:**
    Abre una terminal o línea de comandos (como PowerShell o CMD) y navega hasta la carpeta principal del proyecto.
    ```bash
    cd RUTA/A/TU/PROYECTO_CELSIUS_WEB
    ```

3.  **Iniciar un Servidor Web Local:**
    Python viene con un servidor simple incorporado que es perfecto para esto. Ejecuta el siguiente comando:
    ```bash
    python -m http.server
    ```
    Si tienes Python 3, esto iniciará un servidor en el puerto 8000.

4.  **Abrir en el Navegador:**
    Abre tu navegador web y ve a la siguiente dirección:
    http://localhost:8000

¡Y listo! Podrás interactuar con el conversor deslizando la barra de Celsius.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:
```
project_percep/
│
├── index.html # La estructura principal de la página web (el esqueleto).
├── style.css # Los estilos visuales para darle una apariencia moderna.
├── script.js # La lógica de la aplicación (el cerebro).
│
└── celsius_model_tfjs/ # El modelo de IA convertido para la web.
├── model.json # Describe la arquitectura de la red neuronal.
└── *.bin # Contiene los pesos (el "conocimiento") del modelo.
```
*   **Arquitectura:**
    *   Una capa de entrada que espera 1 valor (grados Celsius).
    *   Dos capas ocultas con 3 neuronas cada una y activación ReLU.
    *   Una capa de salida con 1 neurona que predice el valor en Fahrenheit.
*   **Entrenamiento:** El modelo fue entrenado en Google Colab con pares de datos Celsius-Fahrenheit para que "aprendiera" la fórmula de conversión (`F = C * 1.8 + 32`) por sí mismo a través de un proceso de regresión.
*   **Exportación:** El modelo entrenado se guardó y luego se convirtió al formato de TensorFlow.js usando la herramienta `tensorflowjs_converter`.

## 💡 Cómo Funciona el `script.js`

El archivo `script.js` es el corazón de la interactividad y realiza las siguientes tareas:
1.  **Carga del Modelo:** Utiliza `tf.loadLayersModel()` para cargar de forma asíncrona el `model.json` y los pesos `.bin`.
2.  **Manejo de Eventos:** Escucha el evento `input` del control deslizante (slider).
3.  **Predicción en Tiempo Real:** Cada vez que el slider se mueve:
    a. Obtiene el valor actual de Celsius.
    b. Lo convierte en un **Tensor** de TensorFlow.js.
    c. Llama a `model.predict()` con el tensor.
    d. Extrae el resultado numérico de la predicción.