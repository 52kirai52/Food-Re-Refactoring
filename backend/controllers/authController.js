const authModel = require("../models/authModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const register = async (req, res) => {
  const conn = await db.getConnection();
  try {
    console.log(`${register.name} start`);

    const { username, password, allergies = [] } = req.body;
    if (!username || !password) {
      throw new Error("Username or password is missing.");
    }

    await conn.beginTransaction();

    const exists = await authModel.isUsernameExistsx(conn, username);
    if (exists) {
      throw new Error("Username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await authModel.createUserx(conn, username, hashedPassword);

    await userModel.updateUserAllergiesx(conn, userId, allergies);

    await conn.commit();

    console.log(`User created: id=${userId}, username=${username}, allergies=${allergies}`);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err.stack);
    await conn.rollback();
    return res.status(400).json({ message: err.message });
  } finally {
    conn.release();
    console.log(`${register.name} end`);
  }
};

module.exports = {
  register,
};
