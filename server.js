const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const enviarInscripcion = require('./api/enviar-inscripcion');

const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// Ruta para la API de inscripción
app.post('/api/enviar-inscripcion', async (req, res) => {
  try {
    await enviarInscripcion(req, res);
  } catch (error) {
    console.error('Error en la ruta de envío de inscripción:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

// Manejar todas las demás rutas sirviendo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal', details: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});