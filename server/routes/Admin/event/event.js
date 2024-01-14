const express=require("express");
const router=express.Router();

const authAdminMiddleware = require("../../../middleware/auth/authAdminMiddleware");
const CreateEvent = require("../../../controllers/admin/event/create");


router.post("/create",authAdminMiddleware,CreateEvent);

module.exports=router;