const fs = require('fs');
const csv = require('csv-parser');
const fastcsv = require('fast-csv');

const file1 = `${__dirname}/courses.csv`;
const file2 = `${__dirname}/users_merged.csv`;
const resultFile = `${__dirname}/interactions.csv`;

function readCSV(fileName) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(fileName)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

function writeCSV(fileName, data) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(fileName);
    fastcsv
      .write(data, { headers: true })
      .pipe(ws)
      .on('finish', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

function generarTimestampAleatorioEsteAno() {
  const fechaActual = new Date();
  const inicioAno = new Date(fechaActual.getFullYear(), 0, 1).getTime();
  const finAno = new Date(fechaActual.getFullYear() + 1, 0, 1).getTime();
  const timestampAleatorio = Math.floor(Math.random() * (finAno - inicioAno)) + inicioAno;
  return Math.floor(timestampAleatorio / 1000);
}

function generarDatosViewCourses(randomNumber) {
   // Generar un número aleatorio entre 0 y 1
   
  
   // Si el valor aleatorio es menor que 0.5, devolver "view" con un número aleatorio
   if (randomNumber < 0.5) {
     const view = Math.floor(Math.random() * 100) + 1;
     return { campo: "VIEW", valor: view };
   } else {
     // Si el valor aleatorio es mayor o igual a 0.5, devolver "purchase" con un valor booleano
     const purchase = Math.random() < 0.5;
     return { campo: "PURCHASE", valor: purchase };
   }
}




function asignarCursosAleatorios(usuarios, cursos, timestamp) {
  const asignaciones = [];

  // Determinar el número aleatorio de cursos para el usuario (puedes ajustar esto según tus necesidades)
  const numeroCursos = Math.floor(Math.random() * cursos.length) + 1;

  // Obtener cursos aleatorios para el usuario
  for (let i = 0; i < numeroCursos; i++) {
    const cursoAleatorio = cursos[Math.floor(Math.random() * cursos.length)];
    const randomValue = Math.random();
    const viewAndPurchase = generarDatosViewCourses(randomValue);
    usuarios.forEach((usuario) => {
      // Crear la asignación para el usuario
      asignaciones.push({
        USER_ID: usuario,
        ITEM_ID: cursoAleatorio,
        TIMESTAMP: timestamp,
        EVENT_TYPE:viewAndPurchase.campo,
        EVENT_VALUE:viewAndPurchase.valor
      });
    });
  }

  return asignaciones;
}

Promise.all([readCSV(file1), readCSV(file2)])
  .then(([data1, data2]) => {
    // Combinar los datos de ambos archivos según sea necesario
    // Aquí se está concatenando horizontalmente (agregando columnas)
    
    userData = data2.map((row) => row.id_user);
    courseData = data1.map((row) => row.id_course);
    rating = data1.map((row) => row.rating);
    

    const timestampAleatorio = generarTimestampAleatorioEsteAno();
 
    const asignacionesAleatorias = asignarCursosAleatorios(userData, courseData, timestampAleatorio);


    console.log(asignacionesAleatorias);


    //const datosResultado = data1.map((row, index) => ({ ...row, ...data2[index] }));

    // Escribir el resultado en un nuevo archivo CSV
    return writeCSV(resultFile, asignacionesAleatorias);
  })
  .then(() => {
    console.log('Unión completada. El resultado se encuentra en', resultFile);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
