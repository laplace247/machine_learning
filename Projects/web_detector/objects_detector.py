import cv2
import cvlib as cv
from cvlib.object_detection import draw_bbox

# Lista de objetos que nos interesa detectar y contar.
OBJETOS_DE_INTERES = ['person', 'cell phone']
UMBRAL_PERSONAS_PARA_GUARDAR = 2
NOMBRE_ARCHIVO_SALIDA = "mobilenet_filtro_resultado.jpg"

# Iniciar la captura de video desde la webcam
webcam = cv2.VideoCapture(0)

if not webcam.isOpened():
    print("Error: No se pudo acceder a la cámara.")
    exit()

print("Iniciando detector de objetos. Presiona 'q' para salir.")

# Bucle principal que procesa cada frame del video
while True:
    # Lectura de frame de la webcam
    status, frame = webcam.read()
    if not status:
        print("Error: No se pudo leer el frame.")
        break

    # Realizar la detección de objetos comunes usando cvlib
    # CAMBIO: usar 'yolov4-tiny' para evitar el error de activación
    bbox, label, conf = cv.detect_common_objects(frame, confidence=0.5, model='yolov3')

    # Usaremos estas listas para guardar solo los objetos que nos interesan
    bbox_filtrados = []
    label_filtrados = []
    conf_filtrados = []

    # Un diccionario para llevar la cuenta de los objetos de interés
    conteo_objetos = {obj: 0 for obj in OBJETOS_DE_INTERES}

    # Machacamos los objetos detectados para filtrarlos
    for l, b, c in zip(label, bbox, conf):
        if l in OBJETOS_DE_INTERES:
            label_filtrados.append(l)
            bbox_filtrados.append(b)
            conf_filtrados.append(c)
            conteo_objetos[l] += 1

    # Dibujar los rectángulos y etiquetas SOLO para los objetos filtrados
    output_frame = draw_bbox(frame, bbox_filtrados, label_filtrados, conf_filtrados)

    # Crear el texto para mostrar el conteo en pantalla
    texto_conteo = " | ".join([f"{obj}: {count}" for obj, count in conteo_objetos.items()])

    # Poner el texto del conteo en la esquina superior izquierda del frame
    cv2.putText(output_frame, texto_conteo, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

    # Si el nro de personas detectadas es mayor o igual al umbral, guardamos la imagen
    if conteo_objetos.get('person', 0) >= UMBRAL_PERSONAS_PARA_GUARDAR:
        cv2.imwrite(NOMBRE_ARCHIVO_SALIDA, output_frame)
        cv2.putText(output_frame, "IMAGEN GUARDADA!", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
        print(f"Imagen guardada como '{NOMBRE_ARCHIVO_SALIDA}' (se detectaron {conteo_objetos['person']} personas).")

    # Mostrar el frame resultante en una ventana
    cv2.imshow("Detector de Objetos Filtrado", output_frame)

    # Guardar el último frame para guardar al salir
    frame_guardar = output_frame.copy()

    # Salir por la tecla 'q' del bucle
    if cv2.waitKey(1) & 0xFF == ord('q'):
        if frame_guardar is not None:
            cv2.imwrite('mobilenet_filtro_resultado.jpg', frame_guardar)
            print("Imagen guardada como 'mobilenet_filtro_resultado.jpg'.")
        break

# Liberar la cámara y cerrar todas las ventanas de OpenCV
print("Cerrando el programa.")
webcam.release()
cv2.destroyAllWindows()