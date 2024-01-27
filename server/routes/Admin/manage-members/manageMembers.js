const express=require("express");
const router=express.Router();

const authAdminMiddleware = require("../../../middleware/auth/authAdminMiddleware");
const GetMembers = require("../../../controllers/admin/ManageMembers/GetMembers");
const ApproveMembers = require("../../../controllers/admin/ManageMembers/ApproveMember");


router.get("/getMembers",authAdminMiddleware,GetMembers);
router.post("/approveMembers",authAdminMiddleware,ApproveMembers);
module.exports=router;