const db = require("../config/db");

const updateUserAllergiesx = async (conn, userId, allergies) => {
  console.log(`${updateUserAllergiesx.name} start`);

  const deleteQuery = "DELETE FROM users_allergies WHERE user_id = ?";
  await conn.execute(deleteQuery, [userId]);

  if (!allergies || allergies.length === 0) {
    return;
  }

  const insertQuery = "INSERT INTO users_allergies (user_id, allergy_id) VALUES (?, ?)";
  for (const allergyId of allergies) {
    await conn.execute(insertQuery, [userId, allergyId]);
  }

  console.log(`${updateUserAllergiesx.name} end`);
  return allergies;
};

const updateUserAllergies = async (userId, allergies) => {
  console.log(`${updateUserAllergies.name} start`);

  const deleteQuery = "DELETE FROM users_allergies WHERE user_id = ?";
  await db.execute(deleteQuery, [userId]);

  if (!allergies || allergies.length === 0) {
    return;
  }

  const insertQuery = "INSERT INTO users_allergies (user_id, allergy_id) VALUES (?, ?)";
  for (const allergyId of allergies) {
    await db.execute(insertQuery, [userId, allergyId]);
  }

  console.log(`${updateUserAllergies.name} end`);
  return allergies;
};

module.exports = {
  updateUserAllergiesx,
  updateUserAllergies,
};
