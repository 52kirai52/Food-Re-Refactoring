const db = require("../config/db");

const isUsernameExistsx = async (conn, username) => {
  console.log(`${isUsernameExistsx.name} start`);

  const query = "SELECT 1 FROM users WHERE username = ? LIMIT 1";
  const [rows] = await conn.execute(query, [username]);

  console.log(`${isUsernameExistsx.name} end`);
  return !!rows[0];
};

const createUserx = async (conn, username, hashedPassword) => {
    console.log(`${createUserx.name} start`);

    const query = "INSERT INTO users (username, password_hash) VALUES (?, ?)";
    const [result] = await conn.execute(query, [username, hashedPassword]);

    console.log(`${createUserx.name} end`);
    return result.insertId;
}

module.exports = {
  isUsernameExistsx,
  createUserx,
};
