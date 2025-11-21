const db = require("../config/db");

const updateUserAllergies = async (userId, allergies) => {
  const deleteQuery = "DELETE FROM user_allergies WHERE user_id = ?";
  await conn.execute(deleteQuery, [userId]);

  if (!allergies || allergies.length === 0) {
    return;
  }

  const insertQuery = "INSERT INTO user_allergies (user_id, allergy_id) VALUES (?, ?)";
  for (const allergyId of allergies) {
    await conn.execute(insertQuery, [userId, allergyId]);
  }

  return allergies;
};

module.exports = {
  updateUserAllergies,
};
