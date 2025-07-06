# Web Detector: Detección de Rostros y Objetos en Tiempo Real

Este proyecto permite la detección en tiempo real de rostros humanos y objetos específicos utilizando la webcam de tu computadora. Utiliza modelos preentrenados de OpenCV y CVLib para realizar las detecciones y guardar imágenes de los resultados.

## Características

- **Detección de rostros**: Utiliza clasificadores Haar Cascade para identificar y contar rostros en la imagen de la webcam.
- **Asignación de ID**: Cada rostro detectado recibe un identificador único en pantalla.
- **Conteo en tiempo real**: Muestra el número total de rostros detectados en cada cuadro.
- **Captura de resultados**: Al presionar la tecla `q`, guarda una imagen del último cuadro procesado con las detecciones resaltadas.
- **Detección de objetos(Opcional)**: Si tienes un archivo `objects_detector.py`, puedes detectar personas y celulares usando MobileNet y YOLOv3 (requiere CVLib y TensorFlow).

## Requisitos

- Python 3.x
- OpenCV (`opencv-python`)
- Numpy
- (Opcional para objetos) CVLib (`cvlib`) y TensorFlow

Instala las dependencias necesarias con:

```sh
pip install opencv-python numpy
# Para detección de objetos:
pip install opencv-python cvlib tensorflow 
```
## Uso

### Detección de rostros

Ejecuta el script principal:

```sh
python haar_detector.py
```

- Se abrirá una ventana mostrando la imagen de la webcam.
- Los rostros detectados aparecerán con un recuadro azul y un ID.
- El número total de rostros se muestra en la parte superior izquierda.
- Presiona `q` para salir y guardar la imagen como `haar_resultado.jpg`.

### Detección de objetos (si tienes el script) 
- Primero ejecutas por primera vez el script.
```sh
python objects_detector.py
```
- Despues te generara una carpeta .cvlib (en donde ira el yolov3.cfg y otros archivos)
- Por ejemplo: [C:\Users\HP\.cvlib\object_detection\yolo\yolov3.cfg, yolov3.weights y coco.names]

- Detecta personas y celulares en tiempo real.
- Guarda la imagen como `mobilenet_filtro_resultado.jpg` si se detectan al menos 2 personas.
- Permite salir del programa presionando la tecla `q`.

## Archivos generados

- `haar_resultado.jpg`: Imagen con los rostros detectados.
- `mobilenet_filtro_resultado.jpg`: Imagen con objetos detectados (si usas el detector de objetos).

## Estructura del proyecto

```
web_detector/
│
├── haar_detector.py
├── objects_detector.py 
├── haar_resultado.jpg (capturas)
├── mobilenet_filtro_resultado.jpg (capturas)
└── README.md
└── yolov3/                  # (opcional, solo si quieres gestionar manualmente los modelos)
    ├── yolov3.cfg
    ├── yolov3.weights
    └── coco.names
```
## Notas

- Asegúrate de tener una webcam conectada y funcionando.
- El modelo Haar Cascade viene incluido con OpenCV, por lo que no necesitas descargar archivos adicionales.
- Para la detección de objetos, CVLib descargará automáticamente los modelos necesarios la primera vez que ejecutes el script.

---

Desarrollado con Python y OpenCV.