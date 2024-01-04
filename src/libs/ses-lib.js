const { sesService } = require('../services/aws-services');

const sendEmailP = ({sourceEmail ,receivingEmail, coursesArray}) =>{
    const cursosHTML = coursesArray.map(courses => `
    <ul>
        <li>
            <img src="${courses.split('-')[1]}" alt="${courses.split('-')[0]}">
                <div class="course-info">
                <h2>${courses.split('-')[0]}</h2>
                <p>Description </p>
                <a href="#">See more</a>
            </div>
        </li>
        </ul>
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
                            <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }

                        h1 {
                            text-align: center;
                            color: #333;
                        }

                        ul {
                            list-style-type: none;
                            padding: 0;
                            margin: 0;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: center;
                        }

                        li {
                            background-color: #fff;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            margin: 10px;
                            overflow: hidden;
                            width: 300px;
                            transition: transform 0.3s ease-in-out;
                        }

                        li:hover {
                            transform: scale(1.05);
                        }

                        img {
                            width: 100%;
                            height: auto;
                            border-bottom: 1px solid #ddd;
                        }

                        .course-info {
                            padding: 15px;
                        }
                    </style>
                                        </head>
                                        <body>
                            
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
    
} 


module.exports = {sendEmailP};