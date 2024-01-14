const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const User =require("../../models/user_model");
 // Replace with your actual configuration file

async function authAdminMiddleware(req, res, next) {
  console.log("Hello Mubarazzz jaana");
  let token = req.body.token;
  token = token?.split(' ')[1];

  if (!token) {
    token = req.headers['authorization'];
    token = token?.split(' ')[1];
  }

  if (!token) {
    console.log("Access Denied: Token Not Provided");
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userEmail = decoded.email;
    console.log("-----------------------------");
    console.log(userEmail);
    console.log("-----------------------------");
    
    // Check if the user exists in the database

    const user = await User.findOne({ email_id: userEmail });

    if (!user) {
      console.log("Access Denied: User not found");
      return res.status(401).json({ message: 'Access denied. User not found.' });
    }

    // Check if the user is an admin
    if (user.usertype !== 'admin') {
      console.log("Access Denied: User is not an admin");
      return res.status(403).json({ message: 'Access denied. User is not an admin.' });
    }

    // If the user is an admin, proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error during token verification:", error.message);
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = authAdminMiddleware;


module.exports = authAdminMiddleware;
