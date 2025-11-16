const categoryModel = require('../models/categoryMemberModel');

const getRecommendationForMember = async (req, res, next) => {
    const categoryId = req.query.categoryId;
    const userId = req.query.userId;

    if (!categoryId || !userId) {
        return res.status(400).json({ message: 'categoryId와 userId를 모두 전달해야 합니다.' });
    }

    try {
        const userExists = await categoryModel.checkUserExists(userId);
        if (!userExists) {
            return res.status(404).json({ message: '해당 사용자를 찾을 수 없습니다.' });
        }

        const food = await categoryModel.getRandomFoodExcludingAllergies(userId, categoryId);
        if (food) {
            res.json({ recommendedFood: food });
        } else {
            res.status(404).json({ message: '추천할 음식이 없습니다.' });
        }
    } catch (error) {
        console.error('추천 가져오기 에러:', error);
        next(error);
    }
};

module.exports = {
    getRecommendationForMember
};
