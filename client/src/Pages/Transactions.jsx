import { useEffect, useState } from "react"


import { base_url } from "../Services/API"
import { TextField ,Paper} from "@mui/material"
import Button from '@mui/material/Button';
import CustomizedTables from '../Components/table';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


export default function Transactions(){
    const [details,setDetails]=useState([])
  
  
    const [load,setLoad]=useState(true);
    const [credit, setCredit]=useState();
    const [draw,setDraw]=useState();


    const getDetails=()=>{
        setLoad(true)
        const tok=JSON.parse(localStorage.getItem('token'))||"";
        
        fetch(`${base_url}/ac/transactions`,{
            method:"GET",
            headers:{
                "authorization":`${tok}`,
                 "Content-Type":"application/json"
            }
        })
        .then((res)=>{
            return res.json();

        })
        .then((json)=>{
            console.log(json);
            setDetails(json);
            setLoad(false)
            setCredit("");
            setDraw("");
            
        })

    }
   
    useEffect(()=>{

      getDetails();

    },[])


    const deposite=()=>{
        console.log(details[0]);
        const tok=JSON.parse(localStorage.getItem('token'))||"";
        if(details[0]===undefined)
        {
            var dep={
                Deposite:credit,
                Balance:credit
            }
        }
        else{
      
         dep={
            Deposite:credit,
            Balance:parseInt(details[0].Balance)+parseInt(credit)
        }

        }

     

      
        fetch(`${base_url}/ac/account`,{
            method:"POST",
            headers:{
                "authorization":`${tok}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dep)
        })
        .then((res)=>{
            getDetails();
            setCredit();
            setDraw();
            alert(`Amount Deposited Succesfully. Balance:${dep.Balance}`)
        })
    }

    const withdraw=()=>{
        const tok=JSON.parse(localStorage.getItem('token'))||"";
        if(details[0].Balance<draw || !details[0].Balance){
            alert("Insufficient Funds")
        }
        else
        {
        const wit={
            Withdraw:draw,
            Balance:details[0].Balance-draw
        }
        fetch(`${base_url}/ac/account`,{
            method:"POST",
            headers:{
                "authorization":`${tok}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(wit)
        })
        .then((res)=>{
            getDetails();
          
            alert(`Amount deducted Successfully. Balance:${wit.Balance}`)

        })
    }

    }



    return <>
     {load ?<Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>:null}

      <div className="trans">
     
        <div>
            <div>
                <Paper style={{padding:"30px"}} elevation={20}>
                <h2>DEPOSITE AMOUNT</h2>
            <TextField
          id="standard-helperText"
          label="Enter Amount"
          value={credit}
          onChange={(e)=>setCredit(e.target.value)}
          helperText="Amount should be maximum 10000 and minimum 25"
          variant="standard"
          required
        />
          <Button variant="contained" onClick={deposite}>SUBMIT</Button>
        </Paper>
            </div>
            <div>
            <Paper style={{padding:"30px"}} elevation={20}>
                <h2>WITHDRAWL AMOUNT</h2>
            <TextField
          id="standard-helperText"
          label="Enter Amount"
          value={draw}
          onChange={(e)=>setDraw(e.target.value)}
          helperText="Amount should be maximum 10000 and minimum 25"
          variant="standard"
          required
        />
          <Button variant="contained" onClick={withdraw}>SUBMIT</Button>
        </Paper>
            </div>
        </div>

       <CustomizedTables props={details}/>


      </div>


    </>
}