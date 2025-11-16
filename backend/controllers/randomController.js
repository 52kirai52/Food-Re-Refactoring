const db = require("../config/db");
const model = require("../models/randomModel");

exports.getRandomFood = async (req, res) => {
  try {
    const food = await model.getRandomFood();

    if (!food) {
      return res.status(404).json({
        msg: "DB에 데이터 확인 요망. (404), getRandomFood 쿼리 작동 X",
      });
    }

    res.json({
      recommendedFood: {
        ...food,
        category_name: "랜덤",
      },
    });
  } catch (err) {
    res.status(500).json({
      msg: "randomController파일 확인 요망. (500)",
      error: err,
    });
  }
};

exports.getRandomFoodLogin = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ msg: "userId가 필요합니다." });
  }

  try {
    const food = await model.getRandomFoodLogin(userId);

    res.json({
      recommendedFood: {
        ...food,
        category_name: "랜덤",
      },
    });
  } catch (err) {
    res.status(500).json({
      msg: "randomController.getRandomFoodLogin 처리 중 오류 발생 (500)",
      error: err,
    });
  }
};