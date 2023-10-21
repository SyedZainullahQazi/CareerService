const express=require("express");
const router=express.Router();

const GetUser=require("../../controllers/generals/GetUser");

router.get("/getUser",GetUser);

module.exports = router;