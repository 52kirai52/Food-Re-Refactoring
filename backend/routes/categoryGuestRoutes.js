const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryGuestController');

router.get('/recommend', categoryController.getRecommendation);

module.exports = router;
