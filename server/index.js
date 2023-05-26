const express=require("express");
const dotenv=require("dotenv");
const connection=require("./Config/db");
const cors=require("cors");
const userRouter=require("./routers/userRoutes");
const accountRouter=require("./routers/accountRoute")
dotenv.config();
const app=express();
const PORT=process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/",userRouter)
app.use("/ac",accountRouter)

app.listen(PORT,()=>{
    try{
        connection();
      console.log(`Server listening to the ${PORT} `)
    }
    catch(err){
        console.log("Connection Error")

    }
})
