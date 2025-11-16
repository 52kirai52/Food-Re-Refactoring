const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.signIn);
router.post('/logout', userController.logout);
router.get('/allergies', userController.getAllergies);
router.get('/check', userController.checkLogin);

module.exports = router;