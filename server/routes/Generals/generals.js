const express=require("express");
const router=express.Router();

const GetUser=require("../../controllers/generals/GetUser");
const GetEvents = require("../../controllers/generals/GetEvents");
const UpdateProfile=require("../../controllers/generals/UpdateProfile");
const GetScholarships = require("../../controllers/generals/GetScholarships");
const GetSessions = require("../../controllers/generals/GetSessions");

router.get("/getUser",GetUser);
router.get("/getEvent",GetEvents);
router.get("/getScholarships",GetScholarships);
router.get("/getSessions",GetSessions);
router.post("/update-profile",UpdateProfile);

module.exports = router;