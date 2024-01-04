const fs = require("fs");
const csv = require("csv-parser");
const fastcsv = require("fast-csv");

const file1 = `${__dirname}/courses.csv`;
const file2 = `${__dirname}/users_merged.csv`;
const resultFile = `${__dirname}/interactions.csv`;

function readCSV(fileName) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(fileName)
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (error) => {
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
      .on("finish", () => {
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

function generarTimestampAleatorioEsteAno() {
  const fechaActual = new Date();
  const inicioAno = new Date(fechaActual.getFullYear(), 0, 1).getTime();
  const finAno = new Date(fechaActual.getFullYear() + 1, 0, 1).getTime();
  const timestampAleatorio =
    Math.floor(Math.random() * (finAno - inicioAno)) + inicioAno;
  return Math.floor(timestampAleatorio / 1000);
}

function generarDatosViewCourses(randomNumber, hours, price) {
  if (randomNumber < 0.5) {
    return { campo: "HOURS", valor: hours };
  } else {
    return { campo: "PURCHASE", valor: price };
  }
}

function asignarCursosAleatorios(usuarios, cursos) {
  const asignaciones = [];

  const numeroCursos = Math.floor(Math.random() * cursos.length) + 1;

  for (let i = 0; i < numeroCursos; i++) {
    const timestampAleatorio = generarTimestampAleatorioEsteAno();
    const cursoAleatorio = cursos[Math.floor(Math.random() * cursos.length)];
    const randomValue = Math.random();
    const viewAndPurchase = generarDatosViewCourses(
      randomValue,
      cursoAleatorio.hours,
      cursoAleatorio.price
    );
    usuarios.forEach((usuario) => {
      // Crear la asignación para el usuario
      asignaciones.push({
        USER_ID: usuario,
        ITEM_ID: cursoAleatorio.id_course,
        TIMESTAMP: timestampAleatorio,
        EVENT_TYPE: viewAndPurchase.campo,
        EVENT_VALUE: viewAndPurchase.valor,
      });
    });
  }

  return asignaciones;
}

Promise.all([readCSV(file1), readCSV(file2)])
  .then(([data1, data2]) => {
    userData = data2.map((row) => row.id_user);
    courseData = data1.map((row) => row);
    rating = data1.map((row) => row.rating);

    const asignacionesAleatorias = asignarCursosAleatorios(
      userData,
      courseData
    );

    return writeCSV(resultFile, asignacionesAleatorias);
  })
  .then(() => {
    console.log("Unión completada. El resultado se encuentra en", resultFile);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
