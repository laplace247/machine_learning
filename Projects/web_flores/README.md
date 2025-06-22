# Clasificador de Flores con M. Learning

Un clasificador de imágenes de flores desarrollado con TensorFlow.js que funciona directamente en el navegador.

## Características

- Clasificación en tiempo real de 5 tipos de flores
- Interfaz web moderna y responsiva
- Procesamiento local (sin envío de datos a servidores)
- Confianza de predicción en porcentajes

## Flores que pueden clasificar

- Margaritas (Daisy)
- Dientes de león (Dandelion) 
- Rosas (Roses)
- Girasoles (Sunflowers)
- Tulipanes (Tulips)

## Requisitos

- Python 3.7+
- Miniconda/Anaconda
- TensorFlow
- Navegador web moderno

## Instalación

1. **Clonar el repositorio**
```bash
git clone [tu-repositorio]
cd web_flores
```

2. **Activar entorno conda**
```bash
conda activate tu_entorno
```

3. **Instalar dependencias**
```bash
pip install tensorflowjs
```

4. **Convertir modelo**
```bash
tensorflowjs_converter --input_format=keras model.h5 model_tfjs/
```

## Uso

1. **Iniciar servidor local**
```bash
python -m http.server 8000
```

2. **Abrir navegador**
```
http://localhost:8000
```

3. **Subir imagen**
   - Arrastra una imagen o haz clic para seleccionar
   - Espera el resultado de clasificación

## Estructura del proyecto

```
web_flores/
├── model.h5              # Modelo Keras original
├── model_tfjs/           # Modelo convertido para web
├── index.html            # Interfaz principal
├── script.js             # Lógica de clasificación
├── styles.css            # Estilos modernos
└── README.md             # Este archivo
```
1. **Descargar model.h5 (como atajo)**
```
https://anonymfile.com/LNgn1/modelo.h5
```

## Tecnologías

- **TensorFlow.js** - Inferencia en el navegador
- **HTML5/CSS3** - Interfaz de usuario
- **JavaScript** - Lógica de aplicación
- **Python** - Conversión de modelo

## Formatos soportados

- JPG/JPEG
- PNG
- GIF

## Características técnicas

- Redimensionamiento automático a 150x150px
- Normalización de píxeles (0-1)
- Predicción con tensor 4D
- Limpieza automática de memoria
