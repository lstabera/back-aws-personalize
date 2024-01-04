const { sesService } = require('../services/aws-services');



const sendEmailP = ({sourceEmail ,receivingEmail, coursesArray}) =>{
    try {
        const cursosHTML = coursesArray.map(courseName => `
            <li>
            <strong>${courseName}</strong>
            </li>
        `).join('');


        // Create sendEmail params 
        var params = {
        
            Destination: { /* required */
                ToAddresses: [
                    receivingEmail,
                ]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: `
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>¡Discover Our Courses!</title>
                            </head>
                            <body style="font-family: Arial, sans-serif;">
                
                            <h1 style="color: #3498db;">¡Discover Our Courses!</h1>
                
                            <p>Dear ${receivingEmail},</p>
                
                            <p>We invite you to explore our exciting selection of courses designed to help you achieve your goals and develop new skills.</p>
                
                            <h2>Recommended courses for you:</h2>
                
                            <ul>
                                ${cursosHTML}
                            </ul>
                
                            <p>Don't miss the opportunity to expand your knowledge.</p>
                
                            <p>For more information and to register, visit our <a href="https://courses.test.cebroker.com/search/ga/registered-professional-nurse?tab=courses">website</a>.</p>
                
                            <p>¡We hope to see you soon!</p>
                
                            <p>Sincerely,<br><br>
                            CEbroker<br>
                            Propelus</p>
                
                            </body>
                            </html>
                        `,
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: "demo text format body"
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'Courses selected especially for you'
                }
            },
            Source: sourceEmail, /* required */
        };

    
        return new Promise((resolve, reject) => {
            sesService.sendEmail(params, (err, data) => {
                if (err) {
                    console.error(err, err.stack);
                    reject(err);
                } else {
                    console.log('Data message:', data);
                    resolve(data.MessageId);
                }
            });
        });
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error with sdk' }),
        };
    }
    
    
} 


module.exports = {sendEmailP};