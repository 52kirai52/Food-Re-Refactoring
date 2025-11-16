const db = require("../config/db");

exports.getAllFood = async () => {
    const[rows] = await db.query("SELECT * from food");
    return rows;
};

exports.getRandomFood = async () => {
    const[rows] = await db.query("SELECT * FROM food ORDER BY RAND() LIMIT 1;");
    return rows[0];
}

exports.getRandomFoodLogin = async (userId) => {
    const [rows] = await db.query(
        `SELECT f.food_id, f.food_name
         FROM food f
         WHERE f.food_id NOT IN (
             SELECT fa.food_id
             FROM food_allergy fa
             JOIN user_allergy ua ON fa.allergy_id = ua.allergy_id
             WHERE ua.user_id = ?
         )
         ORDER BY RAND()
         LIMIT 1;`,
        [userId]
    );
    return rows[0];
};