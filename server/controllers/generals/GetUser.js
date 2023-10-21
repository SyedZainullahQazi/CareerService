const jwt = require("jsonwebtoken");
const USER_MODEL = require("../../models/user_model");

const GetUser = async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.email);

    const user = await USER_MODEL.findOne({ email_id: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = GetUser;
