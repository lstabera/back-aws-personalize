const express = require('express');
const app = express();
const puerto = 3000;

app.get('/', (req, res) => {
  
res.json({
    "lol":1
})

});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
