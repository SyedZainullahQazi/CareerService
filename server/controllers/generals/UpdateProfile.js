const jwt = require("jsonwebtoken");
const USER_MODEL = require("../../models/user_model");
const ImageUpload=require("../../utils/uploadImage");

const UpdateProfile = async (req, res) => {
    let ImageURL=null;
  try {
    if(req.body.values?.profilepicture){
        ImageURL=await ImageUpload(req.body.values.profilepicture);
        }
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.email);

    const user = await USER_MODEL.findOne({ email_id: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user);
    if(req.body.values.batch){
        user.batch=req.body.values.batch;
    }
    if(req.body.values.profilepicture)
    {
        user.profilepicture=ImageURL;
    }
    user.save();
    res.status(200).json({message:"Profile Has Been Updated"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = UpdateProfile;
