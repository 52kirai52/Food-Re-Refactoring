const express = require("express");
const router = express.Router();
const randomController = require("../controllers/randomController");

router.get("/", randomController.getRandomFood); 

router.get("/login", randomController.getRandomFoodLogin); 

module.exports = router;