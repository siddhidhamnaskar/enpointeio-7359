import { useEffect, useState } from "react"
import { useContext } from "react"
import { tokenContext } from "./Context"
import { base_url } from "../Services/API"
import { TextField ,Paper} from "@mui/material"
import Button from '@mui/material/Button';
import CustomizedTables from './table';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


export default function Transactions(){
    const [details,setDetails]=useState([])
    const {token,setToken}=useContext(tokenContext);
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
            
        })

    }
   
    useEffect(()=>{

      getDetails();

    },[])


    const deposite=()=>{
        const tok=JSON.parse(localStorage.getItem('token'))||"";

        const dep={
            Deposite:credit,
            Balance:parseInt(details[0].Balance)+parseInt(credit)
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
            alert(`Amount Deposited Succesfully. Balance:${dep.Balance}`)
        })
    }

    const withdraw=()=>{
        const tok=JSON.parse(localStorage.getItem('token'))||"";
        if(details[0].Balance<draw){
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