const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN
});

const personalizeEvents = new AWS.PersonalizeEvents();
const personalizeRuntime = new AWS.PersonalizeRuntime();

module.exports = {
  personalizeEvents,
  personalizeRuntime,
};