const db = require("../config/db");

const isUsernameExistsx = async (conn, username) => {
  const query = "SELECT 1 FROM users WHERE username = ? LIMIT 1";
  const [rows] = await conn.execute(query, [username]);
  return !!rows[0];
};

const createUserx = async (conn, username, hashedPassword) => {
    const query = "INSERT INTO users (username, password_hash) VALUES (?, ?)";
    const [result] = await conn.execute(query, [username, hashedPassword]);
    return result.insertId;
}

module.exports = {
  isUsernameExistsx,
  createUserx,
};
