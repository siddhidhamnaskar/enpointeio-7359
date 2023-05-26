

const mongoose=require("mongoose");
const {Schema}=require("mongoose")
const accountSchema=new Schema({
     Author:{type:Schema.Types.ObjectId,ref:'user'},
     Deposite:{type:Number,required:true},
     Withdraw:{type:Number,required:true},
     Balance:{type:Number,required:true}
  
},{
    timestamps:true
})

const accountModel=mongoose.model("account",accountSchema);
module.exports=accountModel