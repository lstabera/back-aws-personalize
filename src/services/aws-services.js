const AWS = require('aws-sdk');

// Configurar las credenciales de AWS
AWS.config.update({
  region: 'us-east-1', // Reemplaza con tu región de AWS
  accessKeyId: 'ASIAYSLZBIYEOVRXNLXP', // Reemplaza con tu clave de acceso de AWS
  secretAccessKey: 'Qi4fquYORnyeygQZaslndZxuBiTDxQNmGJ7o7z/+',
  sessionToken: 'IQoJb3JpZ2luX2VjED4aCXVzLWVhc3QtMSJIMEYCIQCJKMFj8ywvIHZRlwglOxNqpb5shYcxlgM53l+RMmNYTQIhALg6gATLReSL5zicsvhTFzAXq3BoIUM9gJ8dBqtlkpCsKpkDCMb//////////wEQABoMNTg5MjAxMjI5MzIwIgwrct5VnEPFBYXfU+Yq7QK7bCr0whtrzaLaFQ0BLnaLRQgPDFb6ATKzkgAYomaT2MsKQQtM2s9lFakhFfvgixpttPTOSuAB28bCPiOrLcT2TWQPshLLuuMFjgk3j1eqeEfNznY1j5ascDrLxRDEcS+kfhpz10A6m4KtdsVdZarpd0vODip5eg+q+mjYD5e10L9tgiWqkz+s6Z3rylwjHEnTUemTl6CQzXJEdJEYriXViZYK9O0FddMDa/6cmc0EcoyBH9ffXUbticDHK47tZRsoQwyTLM+N7+vLD958l7WXDVKWMS3d1pTbL1fGM4jV+LirjfC4UpWx5J27bzO+zg7sis/0KjwVRCHPJe4hAh3GRRVa4Ar9nUA4BUV//aTJWphW5uGl0hhKGAQVzDpGiCdsjpuFD2CWjzIU+hRpO9IjUiibtMbgTvZbMOjktIszSQCilXPIey9sCb5VsNWkFuPUec0Qg/iF4VsRKzuHgJBoTQ6s5xUnP6DQr0apRTDZybesBjqlAS16bs9DXnlVX9IklOt7rpLwPXTaI9YFmIwAKASgtLNxrvu7DraZqVbE97TIw8Tjaz0ak3b3JvjT9tgmaUAvGtNddad1lxKZSva4mKdSBcXt+WH6GTXb/v4mYLrwBezHgsRmg06W+EBHU6tMvhxJ8LQmtvMFF67d3bZwozyGkQRg5fIbsC1PyEOTSSeJBk+aggnOedw4kOKYJpaidWhdMl4ICofPug==' // Reemplaza con tu clave secreta de AWS
});

const personalizeEvents = new AWS.PersonalizeEvents();
const personalizeRuntime = new AWS.PersonalizeRuntime();

module.exports = {
  personalizeEvents,
  personalizeRuntime
};