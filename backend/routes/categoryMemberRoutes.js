const express = require('express');
const router = express.Router();
const categoryMemberController = require('../controllers/categoryMemberController');

router.get('/recommend', categoryMemberController.getRecommendationForMember);

module.exports = router;
