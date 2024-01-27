const jwt = require("jsonwebtoken");
const USER_MODEL = require("../../../models/user_model");

const GetMembers = async (req, res) => {
  try {

    const user = await USER_MODEL.find({usertype:"user"});

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = GetMembers;
