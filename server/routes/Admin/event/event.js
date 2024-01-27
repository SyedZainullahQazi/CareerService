const express=require("express");
const router=express.Router();

const authAdminMiddleware = require("../../../middleware/auth/authAdminMiddleware");
const CreateEvent = require("../../../controllers/admin/event/create");
const DeleteEvent = require("../../../controllers/admin/event/delete");
const SearchEvent = require("../../../controllers/admin/event/search");
const UpdateEvent = require("../../../controllers/admin/event/update");


router.post("/create",authAdminMiddleware,CreateEvent);
router.post("/delete",authAdminMiddleware,DeleteEvent);
router.post("/search",authAdminMiddleware,SearchEvent);
router.post("/update",authAdminMiddleware,UpdateEvent);

module.exports=router;