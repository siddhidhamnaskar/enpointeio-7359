const router=require("express");
const Accounts=require("../models/accountModels")
const jwt=require("jsonwebtoken")
const accountRouter=router();
const dotenv=require("dotenv");
dotenv.config();
const secret=process.env.SECRET
accountRouter.post("/account",async(req,res)=>{
    try{
        if(req.headers.authorization)
        { 
            const token=req.headers.authorization
            console.log(req.body);

            jwt.verify(token ,secret,{},async(err,info)=>{
                if(err) throw err;
                console.log(info)

                if(req.body.Deposite)
            {
                const transaction=new Accounts({
                    Author:info.id,
                    Deposite:req.body.Deposite,
                    Withdraw:0,
                    Balance:req.body.Balance

                })

                const trans=await transaction.save();
                res.json("ok")
            }
            else if(req.body.Withdraw)
            {
                const transaction=new Accounts({
                    Author:info.id,
                    Deposite:0,
                    Withdraw:req.body.Withdraw,
                    Balance:req.body.Balance

                })

                const trans=await transaction.save();
                res.json("ok")

            }
        
            })
    
            
        }

    }
    catch(err){
        console.log("error")
        
    }
})


accountRouter.get("/transactions",async(req,res)=>{
    try{
        if(req.headers.authorization){
            const token=req.headers.authorization
            // console.log(req.headers);
            jwt.verify(token ,secret,{},async(err,info)=>{
                if(err) throw err;
                // res.json(info);

                const details=await Accounts.find({Author:info.id}).sort({createdAt:-1}).limit(10);
                console.log(details);
                res.status(200).json(details);
        
            })
    

        }
        
    }
    catch(err){

        res.status(404).json(err);
    }
})

accountRouter.get("/accounts",async(req,res)=>{
    try{
        // console.log(req.headers.authorization);
        if(req.headers.authorization){
            const accounts=await Accounts.find();
            res.status(200).json(accounts)

        }
      

    }
    catch(err){

        res.status(404).json(err);

    }
})

accountRouter.get("/trans/:id",async(req,res)=>{
    try{
        if(req.headers.authorization){
            console.log(1);
             console.log(req.params);
            const accounts=await Accounts.find({Author:req.params.id}).sort({createdAt:-1});
            res.status(200).json(accounts)

        }

    }
    catch(err)
    {
        res.status(404).json(err);

    }
})



module.exports=accountRouter;