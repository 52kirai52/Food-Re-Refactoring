const db = require("../config/db");

const isUsernameExists = async (username) => {
  const query = "SELECT 1 FROM users WHERE username = ? LIMIT 1";
  const [rows] = await db.execute(query, [username]);
  return !!rows[0];
};

module.exports = {
  isUsernameExists,
};
