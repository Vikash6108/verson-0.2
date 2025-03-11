const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.welcomePage=(req,res)=>{
    res.render("userWelcome")
}

module.exports.registerViewController = (req,res)=>{
    res.render("userRegister")
}

module.exports.registerUserController = async (req,res)=>{
    const { username, fullname ,email, password,conform_password} = req.body;

    if(password!==conform_password){
       res.send("Password not match")
    }

    const hashPassword= await bcrypt.hash(password,10)

    const user= await userModel.create({
       username,
       fullname,
       email,
       password:hashPassword,
    });

    const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        }, process.env.JWT_SEC
    );
    
    res.cookie("token", token);

    res.redirect('/profiles/create')

};

module.exports.loginViewController = (req,res)=>{
    res.render("userLogin")
}

module.exports.loginUserController = async (req,res)=>{

    const { email, password }=req.body;

    const user =await userModel.findOne({
        email,
    });

    if(!user){
        return res.status(400).json({
            message:"email not match",
        });
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if (!isMatch) {
        return res.status(400).json({
          message: "invalid password",
        });
    }

    const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        }, process.env.JWT_SEC
    );

    res.cookie("token",token);
    res.redirect('/profiles/create');

 

};