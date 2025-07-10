# Clasificador de Lenguaje de Señas Americano (ASL) con CNN

Este proyecto implementa una Red Neuronal Convolucional (CNN) para clasificar imágenes de manos que representan letras y números del Lenguaje de Señas Americano (ASL). El modelo es entrenado en Google Colab, exportado a formato TensorFlow.js y desplegado como una aplicación web interactiva que se ejecuta completamente en el navegador del cliente.

<img width="974" height="693" alt="Anotación 2025-07-10 134321" src="https://github.com/user-attachments/assets/242d2389-9a65-4e40-b200-dda75414ff7c" />
*Captura de pantalla de la aplicación web en funcionamiento*

## Descripción del Proyecto

El objetivo es crear una herramienta de IA capaz de reconocer señas del alfabeto y números de ASL a partir de una imagen estática. El proyecto abarca el ciclo de vida completo de un modelo de Deep Learning:

1. **Recolección y Preparación de Datos**: Descarga y carga de un dataset público desde Kaggle
2. **Entrenamiento del Modelo**: Construcción y entrenamiento de una CNN en Google Colab
3. **Conversión y Exportación**: Transformación del modelo Keras (.h5) a formato TensorFlow.js
4. **Despliegue Web**: Aplicación web estática que realiza inferencias en tiempo real en el navegador

## Características

- **Clasificación Multi-clase**: Reconoce 37 clases diferentes (26 letras + 10 números + espacio)
- **Inferencia Privada**: Todo el procesamiento se realiza en el navegador del usuario
- **Baja Latencia**: Predicciones instantáneas sin necesidad de servidor
- **Interfaz Intuitiva**: Permite subir imágenes y obtener predicciones al instante
- **Reproducible**: Notebook documentado para entrenar desde cero

## Dataset Utilizado

- **Nombre**: American Sign Language (ASL) Alphabet
- **Fuente**: [Kaggle](https://www.kaggle.com/datasets/grassknoted/asl-alphabet)
- **Contenido**: Más de 5,000 imágenes a color organizadas en 37 clases
- **Formato**: Imágenes RGB de diferentes resoluciones, redimensionadas a 100x100 píxeles

## Tecnologías y Frameworks

### Backend (Entrenamiento)
- **Python 3.x**
- **TensorFlow/Keras**
- **Google Colab** (GPU gratuita)
- **Kaggle API**

### Frontend (Inferencia)
- **HTML5, CSS3, JavaScript**
- **TensorFlow.js**

## Instalación y Ejecución

### Paso 1: Entrenamiento del Modelo (Google Colab)

1. **Abrir el Notebook**
   - Abrir el archivo [Google Colab](https://colab.research.google.com/drive/17bSw9mB1YmO7uqoXIh9Nrlb1dS2h5612?usp=sharing)

2. **Configurar API de Kaggle**
   - Ve a tu perfil de Kaggle → Account → API → Create New API Token
   - Descarga el archivo `kaggle.json` (que ya esta en la carpeta)
   - Súbelo cuando el notebook lo solicite

3. **Habilitar GPU**
   - Menú: Runtime → Change runtime type
   - Hardware accelerator: GPU
   - Guardar

4. **Ejecutar el Entrenamiento**
   ```bash
   # En Colab, ejecuta todas las celdas
   Runtime → Run all
   ```
   
   El notebook descargará automáticamente un archivo `.zip` con:
   - Carpeta `tfjs_asl_model/` (modelo convertido)
   - Archivo `labels.json` (nombres de las clases)

### Paso 2: Despliegue Web (Local)

1. **Preparar el Proyecto**
   ```bash
   mkdir asl-classifier-webapp
   cd asl-classifier-webapp
   ```

2. **Extraer Archivos del Modelo**
   - Descomprime el `.zip` descargado de Colab
   - Copia `tfjs_asl_model/` y `labels.json` a tu carpeta del proyecto
   - Asegúrate de tener `index.html`, `style.css` y `script.js`

3. **Iniciar Servidor Local**
   
   **Opción A: Con Python**
   ```bash
   python -m http.server 8000
   ```
   
   **Opción B: Con Node.js**
   ```bash
   npx http-server
   ```
   
   **Opción C: Con VS Code**
   - Instala la extensión "Live Server"
   - Click derecho en `index.html` → "Open with Live Server"

4. **Abrir la Aplicación**
   - Navega a `http://localhost:8000`
   - Sube una imagen de una seña ASL
   - Haz clic en "Predecir"

## Estructura del Proyecto

```
asl-classifier-webapp/
├── tfjs_asl_model/           # Modelo TensorFlow.js
│   ├── model.json            
│   └── group1-shard*.bin     # 1 de 5 archivos binarios
├── labels.json               # Nombres de las 37 clases
├── index.html               # Estructura HTML
├── style.css                # Estilos CSS
├── script.js                # Lógica JavaScript + IA
├── web_img/                 # Imágenes para documentación
│   └── demo.png
└── README.md                # Archivo actual
```

## Análisis de Resultados

### Métricas de Rendimiento
- **Precisión de Entrenamiento**: ~50%
- **Precisión de Validación**: <10%
- **Problema Identificado**: Sobreajuste (overfitting)

### Observaciones
El modelo muestra signos claros de sobreajuste, memorizando las imágenes de entrenamiento en lugar de aprender patrones generalizables. Esto es común en datasets pequeños con alta variabilidad.
