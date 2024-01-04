const AWS = require('aws-sdk');

const sesService = new AWS.SES({apiVersion: '2010-12-01'});

module.exports = {
  sesService
};