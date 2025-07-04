# Práctica de Regresión Lineal con Redes Neuronales
### Predicción de Precios de Viviendas usando Keras y TensorFlow

Este repositorio contiene el código y la documentación de una práctica de laboratorio, desarrollada en un notebook de Google Colab, para ilustrar el concepto de **regresión lineal** utilizando una red neuronal simple. El objetivo es predecir el precio de una vivienda (una variable numérica continua) basándose en su tamaño en metros cuadrados.

## Índice
1. [Descripción General](#descripción-general)
2. [Conceptos Clave](#-conceptos-clave)
3. [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
4. [Cómo Ejecutar la Práctica](#-cómo-ejecutar-la-práctica)
5. [Estructura del Notebook](#-estructura-del-notebook)
6. [Resultados y Análisis](#-resultados-y-análisis)

## Descripción General
En esta práctica, se construye un modelo predictivo desde cero. A partir de un conjunto de datos ficticio que relaciona el tamaño de varias viviendas con sus precios de venta, se entrena una red neuronal para que aprenda esta relación. Una vez entrenado, el modelo es capaz de estimar el precio de una vivienda de cualquier tamaño, incluso si no estaba en los datos originales.

El proyecto demuestra un flujo de trabajo típico en Machine Learning:
- Carga y preparación de datos.
- Visualización para entender la relación entre variables.
- Diseño de la arquitectura de una red neuronal.
- Compilación y entrenamiento del modelo.
- Evaluación y visualización de los resultados.

## Conceptos Clave
Esta práctica introduce y aplica los siguientes conceptos fundamentales de Machine Learning y Deep Learning:

- **Regresión Lineal:** Técnica para modelar la relación entre una variable dependiente continua y una o más variables independientes.
- **Redes Neuronales (ANNs):** Modelos computacionales inspirados en el cerebro, compuestos por capas de neuronas interconectadas.
- **API Secuencial de Keras:** Una forma sencilla y lineal de construir modelos de redes neuronales capa por capa.
- **Capas Densas (`Dense`):** Capas donde cada neurona está conectada a todas las neuronas de la capa anterior.
- **Función de Activación (`ReLU`):** Introduce no-linealidad en el modelo, permitiéndole aprender patrones complejos.
- **Función de Pérdida (`mean_squared_error`):** Mide el error del modelo en problemas de regresión. El objetivo del entrenamiento es minimizarla.
- **Optimizador (`adam`):** Algoritmo que ajusta los pesos de la red para reducir la función de pérdida.

## Tecnologías Utilizadas
- **Lenguaje:** Python 3.x
- **Entorno:** Google Colab
- **Librerías Principales:**
    - **TensorFlow 2.x:** Plataforma de código abierto para Machine Learning.
    - **Keras:** API de alto nivel para construir y entrenar modelos de Deep Learning.
    - **NumPy:** Para la manipulación eficiente de arreglos numéricos.
    - **Matplotlib:** Para la visualización de datos y resultados.

## Cómo Ejecutar la Práctica
Para ejecutar este proyecto, sigue estos pasos:

1.  **Abrir en Google Colab:** Abre el archivo `.ipynb` directamente en Google Colab.
2.  **Guardar una Copia:** Se recomienda guardar una copia en tu propio Google Drive para poder editar y guardar los cambios (`Archivo -> Guardar una copia en Drive`).
3.  **Ejecutar las Celdas:** Ejecuta cada celda de código en orden secuencial, desde la primera hasta la última. Puedes hacerlo presionando el botón de "Play" de cada celda o usando el atajo de teclado `Shift + Enter`.

No se requiere ninguna instalación local, ya que todas las librerías necesarias vienen preinstaladas en el entorno de Google Colab.

## Estructura del Notebook
El notebook está organizado en los siguientes pasos lógicos:

1.  **Paso 1: Importación de Librerías:** Se cargan todas las herramientas necesarias.
2.  **Paso 2: Preparación de Datos:** Se definen los datos de entrada (`X_reg`: tamaño) y de salida (`y_reg`: precio).
3.  **Paso 3: Visualización Inicial:** Se crea un gráfico de dispersión para observar la relación entre las variables.
4.  **Paso 4: Construcción del Modelo:** Se define la arquitectura de la red neuronal usando el modelo `Sequential` de Keras.
5.  **Paso 5: Compilación del Modelo:** Se configura el modelo para el entrenamiento, especificando el optimizador y la función de pérdida.
6.  **Paso 6: Entrenamiento:** Se entrena el modelo con los datos usando la función `model.fit()`.
7.  **Paso 7: Visualización de Resultados:** Se dibuja la línea de regresión sobre los datos originales para mostrar el ajuste logrado.

## Resultados y Análisis
El resultado principal de la práctica es un gráfico que superpone los datos reales (puntos azules) con la línea de regresión aprendida por el modelo (línea roja).



Como se puede observar en la imagen, la línea roja se ajusta de manera precisa a la tendencia de los datos. Esto demuestra que la red neuronal ha **aprendido con éxito la relación lineal** entre el tamaño de una vivienda y su precio. El modelo no solo memoriza los puntos, sino que generaliza el patrón, lo que le permite hacer predicciones fiables para nuevos datos.