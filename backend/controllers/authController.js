const authModel = require("../models/authModel");

const register = async (req, res) => {
  try {
    console.log(`${register.name} start`);

    const { username, password, allergies } = req.body;
    if (!username || !password) {
      throw new Error("Username or password is missing.");
    }

    const exists = await authModel.isUsernameExists(username);
    if (exists) {
        throw new Error("Username already exists.");
    }

  } catch (err) {
    console.error(err.stack);
    return res.status(400).json({ message: err.message });
  }
};
