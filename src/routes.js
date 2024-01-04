const express = require('express');
const router = express.Router();
const { getRecommendations } = require('./controllers/recomendation-controller');

router.get('/getRecommendations',getRecommendations);

module.exports = router;