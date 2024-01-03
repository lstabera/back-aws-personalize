const { sendEmailP  } = require('../libs/ses-lib');

const sendEmail = async (req, res, next) => {  
    try {
        const { sourceEmail, receivingEmail, courses='[]' } = req.query;
        const coursesArray = JSON.parse(courses);        
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