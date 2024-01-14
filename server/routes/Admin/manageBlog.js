const express=require("express");
const router=express.Router();

const blogImageUpload = require("../../controllers/admin/Blog/blogImageUpload");
const authAdminMiddleware = require("../../middleware/auth/authAdminMiddleware");

router.post("/image-upload",authAdminMiddleware,blogImageUpload);

module.exports=router;