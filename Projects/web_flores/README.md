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
2. **Instalar miniconda/anaconda en WSL**
```bash
sudo apt install miniconda
chmod +x Miniconda3-latest-Linux-x86_64.sh
./Miniconda3-latest-Linux-x86_64.sh
```
3. **Crear y activar entorno conda**
```bash
conda create -n senati python=3.10
conda activate senati
```

4. **Instalar dependencias**
```bash
pip install tensorflowjs
```

5. **Montar el modelo**
```bash
cp /mnt/c/Users/HP/Downloads/web_flores/modelo.h5 ~/modelo.h5
```

6. **Convertir modelo**
```bash
tensorflowjs_converter --input_format=keras modelo.h5 modelo_tfjs/

```

## Uso

1. **Iniciar servidor local**
```bash
npx http-server . -p 8080 
```

2. **Abrir navegador**
```
http://127.0.0.1:8080
```

3. **Subir imagen**
   - Arrastra una imagen o haz clic para seleccionar
   - Espera el resultado de clasificación

## Estructura del proyecto

```
web_flores/
├── modelo.h5             # Modelo Keras original
├── modelo_tfjs/          # Modelo convertido para web
├── notebook/             # Cuaderno de Entrenamiento y Prueba
├── index.html            # Interfaz principal
├── script.js             # Lógica de clasificación
├── styles.css            # Estilos modernos
└── README.md             # Este archivo
```
1. **Descargar model.h5 (como atajo)**
```
https://anonymfile.com/LNgn1/modelo.h5
```
2. **Descargar dataset de flores**
```
https://www.kaggle.com/datasets/alxmamaev/flowers-recognition
```
3. **Descargar dataset de flores**
```
https://www.kaggle.com/datasets/alxmamaev/flowers-recognition
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
