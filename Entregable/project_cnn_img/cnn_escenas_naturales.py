# --------------------------------------------------------------------------
# TRABAJO 1 (VERSIÓN FINAL): CNN CON DATASET DE ESCENAS NATURALES
# --------------------------------------------------------------------------

# Paso 1: Importar las librerías necesarias
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt
import gradio as gr
import pathlib

# Paso 2: Definir las rutas y parámetros del dataset
# Asegúrate de que la ruta coincida con la estructura de tus carpetas.
data_dir_train = pathlib.Path('intel-image-classification/seg_train/seg_train')
data_dir_test = pathlib.Path('intel-image-classification/seg_test/seg_test')

# Parámetros para cargar las imágenes
IMG_HEIGHT = 150
IMG_WIDTH = 150
BATCH_SIZE = 32

# Paso 3: Cargar los datos desde los directorios
# Usamos `image_dataset_from_directory` que es ideal para esta estructura.
# Automáticamente infiere las clases (nombres de las carpetas) y las etiquetas.
train_dataset = tf.keras.utils.image_dataset_from_directory(
    data_dir_train,
    validation_split=0.2,  # Usaremos 20% de los datos de entrenamiento para validación interna
    subset="training",
    seed=123,
    image_size=(IMG_HEIGHT, IMG_WIDTH),
    batch_size=BATCH_SIZE)

validation_dataset = tf.keras.utils.image_dataset_from_directory(
    data_dir_train,
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=(IMG_HEIGHT, IMG_WIDTH),
    batch_size=BATCH_SIZE)

# El conjunto de prueba real
test_dataset = tf.keras.utils.image_dataset_from_directory(
    data_dir_test,
    image_size=(IMG_HEIGHT, IMG_WIDTH),
    batch_size=BATCH_SIZE)

# Obtener los nombres de las clases
class_names = train_dataset.class_names
print("Clases encontradas:", class_names)

# Paso 4: Crear una capa de Aumentación de Datos (Data Augmentation)
# Esto crea nuevas imágenes de entrenamiento modificando las existentes (rotando, volteando).
# Ayuda a prevenir el sobreajuste y a que el modelo generalice mejor.
data_augmentation = keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.1),
    layers.RandomZoom(0.1),
])

# Paso 5: Construcción del modelo de la Red Convolucional (CNN)
model = keras.Sequential([
    # Capa de entrada con la forma de nuestras imágenes
    layers.Input(shape=(IMG_HEIGHT, IMG_WIDTH, 3)),

    # Normalizar los valores de los píxeles de [0, 255] a [0, 1]
    layers.Rescaling(1./255),
    
    # Aplicar la aumentación de datos solo durante el entrenamiento
    data_augmentation,
    
    # Bloques Convolucionales
    layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
    layers.MaxPooling2D((2, 2)),
    
    layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
    layers.MaxPooling2D((2, 2)),
    
    layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
    layers.MaxPooling2D((2, 2)),
    
    # Aplanar y clasificar
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5), # Regularización para evitar sobreajuste
    layers.Dense(len(class_names), activation='softmax') # Capa de salida con una neurona por clase
])

# Paso 6: Compilar el modelo
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Imprimir el resumen del modelo
model.summary()

# Paso 7: Entrenar el modelo
# Este dataset es más grande y complejo, el entrenamiento puede tardar.
epochs = 15
history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=epochs
)

# Paso 8: Evaluar el modelo con el conjunto de prueba real
test_loss, test_acc = model.evaluate(test_dataset)
print(f'\nPrecisión final en el conjunto de prueba: {test_acc:.2f}')

# Paso 9: Generar y explicar un gráfico
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(range(epochs), acc, label='Precisión de Entrenamiento')
plt.plot(range(epochs), val_acc, label='Precisión de Validación')
plt.legend(loc='lower right')
plt.title('Precisión de Entrenamiento y Validación')

plt.subplot(1, 2, 2)
plt.plot(range(epochs), loss, label='Pérdida de Entrenamiento')
plt.plot(range(epochs), val_loss, label='Pérdida de Validación')
plt.legend(loc='upper right')
plt.title('Pérdida de Entrenamiento y Validación')
plt.show()

# --------------------------------------------------------------------------
# EXPORTAR A LA WEB CON GRADIO
# --------------------------------------------------------------------------

# Paso 10: Crear la función de predicción para la interfaz web
def predict_scene(img):
    # La imagen de entrada se procesa para que coincida con el formato del modelo
    img_array = np.array(img)
    img_array = tf.image.resize(img_array, (IMG_HEIGHT, IMG_WIDTH))
    img_array = tf.expand_dims(img_array, 0) # Crear un lote

    # Realizar la predicción
    prediction = model.predict(img_array)[0]
    
    # Devolver un diccionario con las etiquetas y sus probabilidades
    confidences = {class_names[i]: float(prediction[i]) for i in range(len(class_names))}
    return confidences

# Crear y lanzar la interfaz de Gradio
iface = gr.Interface(
    fn=predict_scene,
    inputs=gr.Image(label="Sube una imagen de una escena natural"),
    outputs=gr.Label(num_top_classes=3, label="Predicciones"),
    title="Clasificador de Escenas Naturales",
    description="Sube una imagen de un edificio, bosque, glaciar, montaña, mar o calle y el modelo la clasificará."
)

iface.launch()