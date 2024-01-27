const jwt = require("jsonwebtoken");
const USER_MODEL = require("../../../models/user_model");

const ApproveMembers = async (req, res) => {
  try {
    

    const memberEmail=req.body.values;
    console.log("------------------------");
    console.log(memberEmail);
    console.log("------------------------");

    const user = await USER_MODEL.findOne({email_id:memberEmail});


    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.usertype="member";
    await user.save();
    return res.status(200).json({message:"Approved Member!!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = ApproveMembers;
