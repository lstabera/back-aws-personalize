const { sendEmailP  } = require('../libs/ses-lib');

const sendEmail = async (req, res, next) => {  
    try {
        const { sourceEmail, receivingEmail} = req.query;
        const coursesArray =  [
          {
            "id": "1ddddd",
            "courseName": "course-1",
            "hours": 90,
            "price": 100,
            "url": "https://picsum.photos/200/300"
          },
          {
            "id": "1ddddd",
            "courseName": "course-2",
            "hours": 900,
            "price": 300,
            "url": "https://picsum.photos/200/300"
          },
          {
            "id": "1ddddd",
            "courseName": "course-3",
            "hours": 50,
            "price": 800,
            "url": "https://picsum.photos/200/300"
          }
          ];    
        if (!sourceEmail || !receivingEmail) {
          return res.status(400).json({ error: 'Parameters sourceEmail, receivingEmail are required' });
        }
        if (coursesArray.length < 0) {
            return next({ code: 400, error: 'INVALID_COURSES' });
        }

        const result = await sendEmailP({ sourceEmail ,receivingEmail, coursesArray});
        return res.status(201).json(result);
      } catch (error) {
        console.error('Error  sendEmail:', error);
        return res.status(500).json({ error: 'The email could not be sent.' });
      }
}

module.exports = {sendEmail};