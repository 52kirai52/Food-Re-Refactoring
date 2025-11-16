const db = require('../config/db');

const checkUserExists = async (userId) => {
    const [rows] = await db.query('SELECT 1 FROM user WHERE user_id = ?', [userId]);
    return rows.length > 0;
};

const getRandomFoodExcludingAllergies = async (userId, categoryId) => {
    const [rows] = await db.query(
        `SELECT f.food_id, f.food_name, c.category_name
         FROM food f
         JOIN food_category fc ON f.food_id = fc.food_id
         JOIN category c ON fc.category_id = c.category_id
         WHERE fc.category_id = ?
           AND f.food_id NOT IN (
               SELECT fa.food_id
               FROM food_allergy fa
               JOIN user_allergy ua ON fa.allergy_id = ua.allergy_id
               WHERE ua.user_id = ?
           )
         ORDER BY RAND()
         LIMIT 1;`,
        [categoryId, userId]
    );
    console.log('쿼리 결과:', rows); // 🔍 결과 확인
    return rows[0];
};

module.exports = {
    checkUserExists,
    getRandomFoodExcludingAllergies
};
