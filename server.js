const express = require('express');
const path = require('path');
const app = express();

// ⚠️ cambia "tu-app" por el nombre real de tu carpeta dentro de /dist
app.use(express.static(path.join(__dirname, 'dist/proyecto-temporal/browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/proyecto-temporal/browser/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
