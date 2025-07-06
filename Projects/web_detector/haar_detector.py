import cv2
import numpy as np
# Carga el modelo preentrenado de detección de rostros
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# Inicializa la webcam
cap = cv2.VideoCapture(0)
frame_guardar = None

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Detección de rostros
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    # Dibujar los cuadros delimitadores y asignar ID
    for idx, (x, y, w, h) in enumerate(faces):
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        cv2.putText(frame, f"ID {idx+1}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

    # Mostrar el número total de rostros detectados
    cv2.putText(frame, f"Nro Total rostros: {len(faces)}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

    # Mostrar resultados en una ventana
    cv2.imshow("Detección de rostros", frame)

    # Guardar el último frame para guardar al salir
    frame_guardar = frame.copy()

    # Salir con 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        if frame_guardar is not None:
            cv2.imwrite('haar_resultado.jpg', frame_guardar)
            print("Imagen guardada como 'haar_resultado.jpg'.")
        break

# Liberar recursos
cap.release()
cv2.destroyAllWindows()