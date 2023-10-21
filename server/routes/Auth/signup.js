const express=require("express");
const router=express.Router();

const SignIn=require("../../controllers/auth/AuthController");

router.post("/SendGoogleToken",SignIn);

module.exports=router;