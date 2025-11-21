const db = require("../config/db");

const isUsernameExists = async (username) => {
  const query = "SELECT 1 FROM users WHERE username = ? LIMIT 1";
  const [rows] = await db.execute(query, [username]);
  return !!rows[0];
};

const createUser = async (username, hashedPassword) => {
    const query = "INSERT INTO users (username, password_hash) VALUES (?, ?)";
    const [result] = await db.execute(query, [username, hashedPassword]);
    return result.insertId;
}

module.exports = {
  isUsernameExists,
  createUser,
};
