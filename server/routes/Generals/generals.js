const express=require("express");
const router=express.Router();

const GetUser=require("../../controllers/generals/GetUser");
const GetEvents = require("../../controllers/generals/GetEvents");

router.get("/getUser",GetUser);
router.get("/getEvent",GetEvents);

module.exports = router;