const cors=require("cors");
const dotenv=require('dotenv').config()
const express=require("express");

const CONNECT_DATABASE=require("./database/dbConnection");

const SIGNUP_ROUTE=require("./routes/Auth/signup");
const GENERAL_ROUTE=require("./routes/Generals/generals")
const ADMIN_MANAGEBLOG=require("./routes/Admin/manageBlog");
const ADMIN_EVENT=require("./routes/Admin/event/event");

const app=express();    

CONNECT_DATABASE();
app.use(cors());
app.use(express.json({ limit: '15mb' }));

app.use('/api/signup', SIGNUP_ROUTE); 
app.use('/api/generals',GENERAL_ROUTE);
app.use('/api/admin/manage-blog',ADMIN_MANAGEBLOG);
app.use('/api/admin/event',ADMIN_EVENT);
app.get("/", (req, res) => {
    const countryNames = ["United States", "Canada", "United Kingdom"];
    console.log("Hellow")
    res.json({ countries: countryNames });
});

app.listen(5000,()=>{
    console.log("Server Started on Port 5000");
})