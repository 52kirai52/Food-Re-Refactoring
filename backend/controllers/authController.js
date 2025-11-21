const authModel = require("../models/authModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const register = async (req, res) => {
  try {
    console.log(`${register.name} start`);

    const { username, password, allergies = [] } = req.body;
    if (!username || !password) {
      throw new Error("Username or password is missing.");
    }

    const exists = await authModel.isUsernameExists(username);
    if (exists) {
      throw new Error("Username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await authModel.createUser(username, hashedPassword);

    await userModel.updateUserAllergies(userId, allergies);

    console.log(`User created: id=${userId}, username=${username}, allergies=${allergies}`);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err.stack);

    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  register,
};
