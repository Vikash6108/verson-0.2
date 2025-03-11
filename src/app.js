const express = require("express");
const app = express();
const userRoutes= require("./routers/user.router")
const profileRoutes=require("./routers/profile.router")
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv")
dotenv.config()


app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get("/", function(req,res){
    res.render('userWelcome');
})
app.use("/users",userRoutes)
app.use("/profiles",profileRoutes)

module.exports=app;



