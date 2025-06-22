const classes = ['margarita', 'diente de león', 'rosas', 'girasol', 'tulipan']; // Ajusta esto si tienes otros nombres

let model;

async function cargarModelo() {
  model = await tf.loadLayersModel('./modelo_tfjs/model.json');
  console.log("Modelo cargado.");
}

document.getElementById('imageInput').addEventListener('change', async function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = function (event) {
    img.src = event.target.result;
    document.getElementById('preview').src = img.src;
    document.getElementById('preview').style.display = 'block';
    document.getElementById('resultado').textContent = 'Procesando...';
  };

  reader.readAsDataURL(file);

  img.onload = async function () {
    const tensor = tf.browser.fromPixels(img)
      .resizeNearestNeighbor([150, 150])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();

    const pred = model.predict(tensor);
    const probs = await pred.data();
    const maxIndex = probs.indexOf(Math.max(...probs));
    const resultado = classes[maxIndex];

    document.getElementById('resultado').textContent =
      `Resultado: ${resultado} (${(probs[maxIndex] * 100).toFixed(2)}%)`;
  };
});

cargarModelo();

