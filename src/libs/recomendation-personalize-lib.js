const {personalizeRuntime } = require('../services/aws-services');


const getRecomendationsP = ({campaignArn ,userId , numResults }) =>{
    const params = {
        campaignArn,
        userId,
        numResults
    }

    return new Promise((resolve, reject) => {
        personalizeRuntime.getRecommendations(params, (err, data) => {
          if (err) {
            console.error(err, err.stack);
            reject(err);
          } else {
            console.log('Recomendaciones:', data.itemList);
            resolve(data.itemList);
          }
        });
      });
} 


module.exports = getRecomendationsP;