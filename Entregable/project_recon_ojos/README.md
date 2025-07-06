# Reconocimiento de Ojos en Tiempo Real con OpenCV

Este proyecto es una aplicación en Python que utiliza la cámara web para detectar rostros y, posteriormente, los ojos dentro de cada rostro en tiempo real. Los ojos detectados se enmarcan con un rectángulo azul para una visualización clara. Al salir de la aplicación, se guarda automáticamente una captura del último fotograma procesado.

La aplicación implementa una estrategia de **detección jerárquica**, lo que la hace eficiente y precisa: primero localiza la región general de un rostro y luego limita la búsqueda de ojos a esa área específica.

## Características

-   **Detección en Tiempo Real:** Procesa el video de la cámara web fotograma a fotograma.
-   **Detección Jerárquica:** Utiliza un clasificador para rostros y otro para ojos, mejorando la precisión y el rendimiento.
-   **Visualización Clara:** Dibuja rectángulos de color azul alrededor de cada ojo detectado.
-   **Guardado Automático al Salir:** Al presionar la tecla 'q', el último fotograma con los resultados se guarda como `resultado_ojos.jpg`.
-   **Basado en Haar Cascades:** Utiliza los robustos y probados clasificadores Haar Cascade de OpenCV.

## Requisitos

-   Python 3.8+
-   OpenCV-Python: `pip install opencv-python`
-   Numpy: `pip install numpy`

## Instalación y Ejecución

1. **Crear y activar entorno virtual con Python 3.10:**
    ```bash
    py -3.10 -m venv tf-env
    .\tf-env\Scripts\activate
    ```

2.  **Instala la dependencia de OpenCV y Numpy:**
    ```bash
    pip install opencv-python
    pip install numpy
    ```

3.  **Descarga los Clasificadores Haar Cascade (Paso Esencial):**
    Para que el programa funcione, necesitas los modelos pre-entrenados. Descárgalos de los siguientes enlaces y **guárdalos en la misma carpeta que el script de Python**.

    -   **Clasificador de Rostros:**
        -   [haarcascade_frontalface_default.xml](https://github.com/opencv/opencv/blob/master/data/haarcascades/haarcascade_frontalface_default.xml)
    -   **Clasificador de Ojos (Importante):**
        -   [haarcascade_eye.xml](https://github.com/opencv/opencv/blob/master/data/haarcascades/haarcascade_eye.xml)

4.  **Ejecuta el script:**
    ```bash
    python reconocimiento_ojos.py
    ```

5.  **Uso de la aplicación:**
    -   Se abrirá una ventana mostrando la vista de tu cámara.
    -   Apunta la cámara a tu rostro. Verás cómo se dibujan rectángulos azules alrededor de tus ojos.
    -   Presiona la tecla **`q`** para cerrar la aplicación. Al hacerlo, se guardará una imagen llamada `resultado_ojos.jpg` en la misma carpeta.
## Estructura de carpetas
    ```
    project_recon_ojos/
    │
    ├── README.md                              # Documentación del proyecto
    ├── reconocimiento_ojos.py                 # Script principal de detección de ojos
    ├── haarcascade_frontalface_default.xml    # Clasificador Haar para rostros
    ├── haarcascade_eye.xml                    # Clasificador Haar para ojos
    └── resultado_ojos.jpg                     # Imagen guardada al salir (generada automáticamente)
    ```
## Funcionamiento

El script sigue un pipeline de procesamiento de imágenes para cada fotograma del video:

1.  **Carga de Modelos:** Al inicio, el programa carga dos clasificadores Haar Cascade. Estos son modelos basados en aprendizaje automático que han sido entrenados para reconocer características visuales específicas (en este caso, rostros y ojos).

2.  **Preprocesamiento:** Cada fotograma capturado se convierte a escala de grises. Esto se hace porque los clasificadores Haar no necesitan información de color y funcionan más rápido y eficazmente analizando las diferencias de intensidad y contraste.

3.  **Detección de Rostros (Nivel 1):** El clasificador de rostros (`face_cascade`) se aplica a toda la imagen en escala de grises para encontrar todas las caras presentes. Devuelve una lista de rectángulos que definen la ubicación y el tamaño de cada rostro.

4.  **Detección de Ojos (Nivel 2 - Jerárquica):**
    -   El programa itera sobre cada rostro detectado.
    -   Para cada rostro, se crea una **Región de Interés (ROI)**. Esta ROI es un recorte de la imagen que contiene únicamente el rostro.
    -   El clasificador de ojos (`eye_cascade`) se aplica **solo a esta pequeña ROI**. Este enfoque es mucho más eficiente que buscar ojos en toda la imagen y reduce drásticamente los falsos positivos (por ejemplo, que el algoritmo confunda orificios nasales con ojos).

5.  **Visualización y Salida:**
    -   Una vez que se detectan los ojos dentro de la ROI, se dibujan rectángulos azules (`cv2.rectangle`) sobre la versión en color de esa misma ROI.
    -   El fotograma final con las anotaciones se muestra en una ventana.
    -   Cuando el usuario presiona la tecla 'q', el programa ejecuta la función `cv2.imwrite()` para guardar el fotograma actual en el disco antes de cerrar la aplicación.