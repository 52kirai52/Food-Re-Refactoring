const db = require('../config/db');

const getRandomFoodByCategory = async (categoryId) => {
    const [rows] = await db.query(
        `SELECT f.food_id, f.food_name, c.category_name
         FROM food f
         JOIN food_category fc ON f.food_id = fc.food_id
         JOIN category c ON fc.category_id = c.category_id
         WHERE fc.category_id = ?
         ORDER BY RAND()
         LIMIT 1;`,
        [categoryId]
    );
    return rows[0];
};

module.exports = {
    getRandomFoodByCategory
};
