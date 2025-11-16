const categoryModel = require('../models/categoryGuestModel');

const getRecommendation = async (req, res) => {
    const categoryId = req.query.categoryId;
    console.log('요청받은 카테고리 ID:', categoryId);

    try {
        const food = await categoryModel.getRandomFoodByCategory(categoryId);
        if (food) {
            res.json({ recommendedFood: food });
        } else {
            res.status(404).json({ message: '추천할 음식이 없습니다' });
        }
    } catch (error) {
        console.error('추천 가져오기 에러:', error);
        res.status(500).json({ message: '추천을 가져오는 중 오류 발생' });
    }
};

module.exports = {
    getRecommendation
};
