# Reconocimiento de ojos con OpenCV
import cv2
import numpy as np
# Cargar los modelos clasificadores para detección de rostro y ojos
try:
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')
except cv2.error as e:
    print(f"Error al cargar los archivos cascade: {e}")
    print("Asegúrate de que los archivos .xml estén en la misma carpeta que el script.")
    exit()

# Iniciar la webcam
webcam = cv2.VideoCapture(0)
if not webcam.isOpened():
    print("Error: No se pudo acceder a la webcam.")
    exit()

# Bucle principal para capturar frames de la webcam
while True:
    status, frame = webcam.read()
    if not status:
        break

    # Convertir el frame a escala de grises para mejorar la detección
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detectar rostros en la imagen
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    # Detectar ojos en cada rostro encontrado
    for (x, y, w, h) in faces:
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = frame[y:y+h, x:x+w]
        
        eyes = eye_cascade.detectMultiScale(roi_gray, scaleFactor=1.1, minNeighbors=8)
        
        for (ex, ey, ew, eh) in eyes:
            cv2.rectangle(roi_color, (ex, ey), (ex+ew, ey+eh), (255, 0, 0), 2) # Rectángulo azul para los ojos

    # Mostrar el frame con los ojos detectados
    cv2.imshow('Reconocimiento de Ojos', frame)

    # Logica para salir del bucle y guardar la imagen
    if cv2.waitKey(1) & 0xFF == ord('q'):
        nombre_archivo = "resultado_ojos.jpg"
        
        # Guardar el frame actual como imagen
        cv2.imwrite(nombre_archivo, frame)
        print(f"\n¡Imagen guardada como '{nombre_archivo}'!")
        break

# Limpieza y cierre de la webcam
print("Cerrando el programa.")
webcam.release()
cv2.destroyAllWindows()