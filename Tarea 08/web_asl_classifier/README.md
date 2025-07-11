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

### Paso 2: Despliegue Web con Entorno Virtual Python 3.10 

Esta opción es ideal para usuarios de Windows que prefieren usar PowerShell y mantener un entorno Python aislado.

1. **Verificar Instalación de Python 3.10**
   ```powershell
   python --version
   ```
   Si no tienes Python 3.10, descárgalo desde [python.org](https://www.python.org/downloads/)

2. **Crear y Configurar el Proyecto**
   ```powershell
   # Crear directorio del proyecto
   mkdir web_asl_classifier
   cd web_asl_classifier
   ```

3. **Crear Entorno Virtual**
   ```powershell
   # Crear entorno virtual con Python 3.10
   python -m venv venv_asl
   ```

4. **Activar Entorno Virtual**
   ```powershell
   # Activar el entorno virtual
   .\venv_asl\Scripts\Activate
   ```
   
   > **Nota**: Si obtienes un error de política de ejecución, ejecuta:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

5. **Verificar Activación del Entorno**
   ```powershell
   # Deberías ver (venv_asl) al inicio de tu prompt
   # Verificar que estás usando el Python correcto
   python --version
   which python
   ```

6. **Instalar Dependencias (Opcional)**
   ```powershell
   # Actualizar pip
   python -m pip install --upgrade pip
   ```

7. **Iniciar Servidor Web**
   ```powershell
   # Servidor HTTP básico de Python
   python -m http.server 8000
   ```
8. **Abrir la Aplicación**
    ```powershell
    # Abrir automáticamente en el navegador predeterminado
    start http://localhost:8000
    ```

## Estructura del Proyecto

```
web_asl_classifier/
├── tfjs_asl_model/           # Modelo TensorFlow.js
│   ├── model.json            
│   └── group1-shard*.bin     # 1 de 5 archivos binarios
├── labels.json               # Nombres de las 37 clases
├── index.html               # Estructura HTML
├── style.css                # Estilos CSS
├── script.js                # Lógica JavaScript + IA
└── README.md                # Este archivo de documentacion
```

## Análisis de Resultados

### Métricas de Rendimiento
- **Precisión de Entrenamiento**: ~50%
- **Precisión de Validación**: <10%
- **Problema Identificado**: Sobreajuste (overfitting)

### Observaciones
El modelo muestra signos claros de sobreajuste, memorizando las imágenes de entrenamiento en lugar de aprender patrones generalizables. Esto es común en datasets pequeños con alta variabilidad.
