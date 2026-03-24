# Detector de Género en Tiempo Real

Aplicación de visión por computadora que detecta rostros en tiempo real y predice el género usando la cámara web.

## Características

- **Detección múltiple de rostros** en tiempo real
- **Predicción de género** (Male/Female) con porcentaje de confianza
- **Visualización inmediata** con recuadros y etiquetas
- **Manejo robusto de errores** para rostros pequeños o mal iluminados

## Requisitos

Para ejecutar este proyecto, necesitas tener Python y estas bibliotecas instaladas:
- Python 3.8 o superior (3.10 recomendado)
- OpenCV-Python: pip install opencv-python
- cvlib: pip install cvlib
- TensorFlow: pip install tensorflow
- NumPy: pip install numpy

- Cámara web funcional
- Conexión a internet

## Instalación Rápida
1. **Crear y activar entorno virtual con Python 3.10:**
```bash
py -3.10 -m venv tf-env
.\tf-env\Scripts\activate
```
2. **Instala dependencias:**
```bash
pip install opencv-python cvlib tensorflow numpy
```

3. **Descarga modelos (Importante):**
Crea la estructura de carpetas en tu directorio de usuario:
```
.cvlib/
├── object_detection/
│   ├── yolo/
│   │   ├── yolov3.cfg
│   │   ├── yolov3.weights
│   │   └── coco.names
└── pre-trained/
    ├── gender_deploy.prototxt
    └── gender_net.caffemodel
    └── opencv_face_detector_uint8.pb (Opcional)
    └── opencv_face_detector.pbtxt (Opcional)
```

Descarga los archivos de modelo:
- **Face Detection**: `opencv_face_detector.pbtxt`, `opencv_face_detector_uint8.pb`
- **Gender Detection**: `gender_deploy.prototxt`, `gender_net.caffemodel`

4. **Ejecutar script:**
```bash
python detector_genero.py
```

## Uso

- La aplicación abre automáticamente la cámara web
- Muestra recuadros verdes alrededor de rostros detectados
- Etiquetas formato: `"Male (98.5%)"` o `"Female (87.3%)"`
- Presiona `q` para salir de la aplicación

## Archivos generados
- `captura_genero.jpg`: Imagen con el último rostro detectado con género predicho.

## Cómo Funciona

1. **Captura de video** desde la cámara web
2. **Detección de rostros** usando modelos pre-entrenados de OpenCV
3. **Recorte y padding** de cada rostro detectado
4. **Predicción de género** usando red neuronal Caffe
5. **Visualización** con recuadros y etiquetas en tiempo real

## Configuración

```python
padding = 20  # Margen alrededor del rostro para mejor precisión
```

## Solución de problemas

- **Error de cámara**: Verifica permisos y que no esté en uso por otra app
- **Modelos no encontrados**: Descarga manualmente los archivos de modelo
- **Predicciones inconsistentes**: Mejora la iluminación y visibilidad de rostros

## Limitaciones

- Requiere buena iluminación para óptimos resultados
- Funciona mejor con rostros frontales
- Precisión puede variar según calidad de la cámara
- Modelos pre-entrenados pueden tener sesgos inherentes