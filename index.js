require('dotenv').config();
const express = require('express');
const app = express();
const puerto = 3000;

const routes = require('./src/routes');

app.use('/', routes);



app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
