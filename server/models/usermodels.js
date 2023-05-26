

const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    Name:{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true}
})

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;