# Descripción: Este script utiliza OpenCV y cvlib para detectar rostros en tiempo real desde la cámara web
import cv2
import cvlib as cv
import numpy as np

# Iniciar la captura de video desde la cámara web
webcam = cv2.VideoCapture(0)
if not webcam.isOpened():
    print("Error: No se puede acceder a la cámara.")
    exit()

print("Iniciando detector de género...")
print("Presione 'q' para salir.")

# Padding para los rectángulos (para que no queden tan pegados al rostro)
padding = 20

while True:
    # Leer un frame de la cámara
    status, frame = webcam.read()
    if not status:
        break

    # Detectar rostros en el frame actual
    # La función detect_face de cvlib devuelve dos cosas:
    # faces: una lista de coordenadas [startX, startY, endX, endY] para cada rostro.
    # confidences: una lista con la confianza de cada detección.
    faces, confidences = cv.detect_face(frame)

    # Iteramos sobre cada rostro detectado para analizarlo individualmente.
    # El índice 'idx' nos ayudará a hacer coincidir el rostro con su confianza.
    for idx, f in enumerate(faces):
        
        # Obtener las coordenadas del rostro
        (startX, startY) = (f[0], f[1])
        (endX, endY) = (f[2], f[3])

        # Dibujar un rectángulo alrededor del rostro
        cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)

        # Predecir el género del rostro detectado
        # Recortar la región del rostro del frame. 
        # Añadimos un padding para que el modelo de género tenga un poco más de contexto.
        # Nos aseguramos de no salirnos de los límites de la imagen con max(0, ...) y min(width/height, ...)
        face_crop = np.copy(frame[max(0, startY-padding):min(endY+padding, frame.shape[0]-1), 
                                  max(0, startX-padding):min(endX+padding, frame.shape[1]-1)])
        
        # Si el recorte es válido (a veces puede ser muy pequeño o fallar)
        if face_crop.shape[0] < 10 or face_crop.shape[1] < 10:
            continue

        # Aplicar el modelo de predicción de género
        # La función devuelve:
        #   - gender: una lista de géneros predichos (en este caso, solo uno)
        #   - confidence: la confianza de la predicción
        try:
            gender, conf_gender = cv.detect_gender(face_crop)
            # Obtenemos la etiqueta y la confianza del primer (y único) resultado
            gender_label = gender[0]
            gender_confidence = conf_gender[0]
        except Exception as e:
            # A veces, en rostros muy pequeños o mal iluminados, el modelo puede fallar.
            # En ese caso, simplemente continuamos con el siguiente rostro.
            print(f"No se pudo predecir el género: {e}")
            continue

        # Crear la etiqueta para mostrar
        # Formateamos la etiqueta para mostrarla en pantalla
        # Ejemplo: "Male (98.5%)"
        label = f"{gender_label} ({gender_confidence*100:.1f}%)"
        
        # Determinar la posición del texto. Lo pondremos justo encima del rectángulo.
        Y = startY - 10 if startY - 10 > 10 else startY + 10
        
        # Escribir la etiqueta en el frame
        cv2.putText(frame, label, (startX, Y), cv2.FONT_HERSHEY_SIMPLEX,
                    0.7, (0, 255, 0), 2)
    
    # Mostrar el frame final con todas las detecciones y etiquetas
    cv2.imshow("Detector de Genero", frame)

    # Esperar la tecla 'q' para salir
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        nombre_archivo = f"captura_genero.jpg"
        # Guardar el frame CON las anotaciones (rectángulos y texto)
        cv2.imwrite(nombre_archivo, frame)
        print(f"¡Imagen guardada como '{nombre_archivo}'!")
        break

# Liberar los recursos
webcam.release()
cv2.destroyAllWindows()