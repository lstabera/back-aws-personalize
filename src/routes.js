const express = require('express');
const router = express.Router();
const { getRecommendations } = require('./controllers/recomendation-controller');
const { sendEmail } = require('./controllers/sendEmail-controller');

router.get('/getRecommendations',getRecommendations);
router.post('/sendEmail', sendEmail);

module.exports = router;