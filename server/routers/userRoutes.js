
const router=require('express');
const User=require("../models/usermodels");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const dotenv =require("dotenv");
dotenv.config();

const userRouter=router();
const secret=process.env.SECRET

userRouter.post("/signup",async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt(8);
        const hashPass=await bcrypt.hash(req.body.Password,salt);
        const newUser=new User({
          Name:req.body.Name,
          Email:req.body.Email,
          Password:hashPass
          
  
            
        });
        const user= await newUser.save();
        // console.log(user);
        res.status(200).json(user);
  
     }
     catch(err){
      res.status(500).json(err);
        
     }
  
   
})


userRouter.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({Email:req.body.Email});
    
        !user && res.status(400).json("Wrong Credintials");
    
        const validate=await bcrypt.compare(req.body.Password,user.Password);

       if(validate)
       {
        jwt.sign({Name:user.Name,Email:user.Email,id:user._id},secret,{},(err,token)=>{
            if(err) throw err;
            // console.log(token);
            
            res.cookie('token',token).json(token)
        
        })
       }
       else{
         res.status(400).json("Incorrect Password");
       }

      
    
    //    const {Password, ...other}=user._doc;
   
    //    res.status(200).json(other);
    
      }
      catch(err)
      {
        res.status(500).json(err);
   
      }
})


userRouter.get("/users",async(req,res)=>{
  try{
    if(req.headers.authorization)
    {
      const data=await User.find();
      res.status(200).json(data);
    }

  }
  catch(err){
    res.status(500).json(err);

  }
})

module.exports=userRouter