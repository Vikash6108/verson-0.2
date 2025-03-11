const profileModel=require("../models/profile.model")
const userModel=require("../models/user.model")

module.exports.createProfileView =(req,res)=>{
    res.render('userProfile')
}

module.exports.createProfileUser = async (req,res) => {
    const {media,caption}=req.body

    const profile= await profileModel.create({
      media,
      caption
    })
   
    await userModel.findOneAndUpdate(
        {
          _id:req.user.id
        },{
            $push:{
             profile:profile._id
            }
        })    
   res.send(profile)
}
