import fs from 'fs';
import csv from 'csv-parser';

 export const handler = async (event) => {
    try {
      
        const userIdExample = event.userId
        const resultsCoursesByUser = 'convertjson.jsonl';
        const courses = 'courses.csv';

        const contenidoArchivo = await fs.readFileSync(resultsCoursesByUser, 'utf8');

        const jsonFile = JSON.parse(contenidoArchivo);

        let coursesPerUser = jsonFile.filter(course => course.output.usersList.includes(userIdExample)).map(course => course.input.itemId);
        
        const totalCourses = await Promise.all([await readCSV(courses)]).then(([data]) => {
            
          return data.filter(course => coursesPerUser.includes(course.id))

        })
          
        return {
            statusCode: 200,
            idUser: userIdExample,
            body: totalCourses
        };

    } catch (error) {
        console.error('Error al leer el archivo:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al leer el archivo' }),
        };
    }
};

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
