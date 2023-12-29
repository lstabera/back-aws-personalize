const { getRecomendationsP  } = require('../libs/recomendation-personalize-lib');


const getRecommendations = async (req, res, next) => {
    try {
      const { campaignArn, userId, numResults } = req.query;
      if (!campaignArn || !userId || !numResults) {
        return res.status(400).json({ error: 'parameters campaignArn, userId y numResults. is required' });
      }
      const result = await getRecomendationsP({ campaignArn, userId, numResults });
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error  getRecommendations:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };
  
  module.exports = {getRecommendations};





