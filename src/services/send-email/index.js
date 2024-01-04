const { sendEmailP  } = require('./src/libs/ses-lib');
async function handler (event) {
  console.log(event);
  try {
    const { sourceEmail, receivingEmail, courses=[] } = JSON.parse(event.body);
  
    
    if (!sourceEmail || !receivingEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Parameters sourceEmail, receivingEmail are required' }),
      }
    }
    if (courses.length < 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'INVALID_COURSES' }),
      }      
    }

    const result = await sendEmailP({ sourceEmail ,receivingEmail, coursesArray});
    return {
      statusCode: 200,
      idUser: receivingEmail,
      //body: JSON.stringify(totalCourses),
      body: result,
    };
  } catch (error) {
    console.error('Error  sendEmail:', error); 
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'The email could not be sent' }),
    };
  }
};

module.exports = {
  handler
};
