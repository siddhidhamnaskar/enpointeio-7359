import { useEffect, useState } from "react"

import * as React from 'react';
import { base_url } from "../Services/API"
import { TextField ,Paper} from "@mui/material"
import Button from '@mui/material/Button';
import CustomizedTables from '../Components/table';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Transactions(){
    const [details,setDetails]=useState([])
    const [balance,setBalance]=useState(0);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
  
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
            if(json[0]!==undefined)
            {
                setBalance(json[0].Balance);
                setLoad(false)
                setCredit("");
                setDraw("");
            }
          
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
        if(credit<0)
        {
            alert("Please Enter Valid Amount")
        }
        else if(details[0]===undefined)
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
        if(draw<0)
        {
            alert("Please Enter Valid Amount")
        }
        else if(details[0].Balance<draw || details[0]===undefined){
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


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
   
      const handleClickOpen1 = () => {
        setOpen1(true);
      };
    
      const handleClose1 = () => {
        setOpen1(false);
      };


    return <>
     {load ?<Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>:null}

      <div className="trans">
     
        <div>
            <div>
                <Paper style={{padding:"30px"}} elevation={20}>
             
                   <Button variant="contained"  onClick={handleClickOpen}>DEPOSITE</Button>
                   <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Deposite Amount</DialogTitle>
        <DialogContent>
          <DialogContentText>
         <h3>Available Balance:{balance}</h3> 
          Enter Amout Here To Deposite
          </DialogContentText>
          <TextField
          id="standard-helperText"
          type="Number"
          label="Enter Amount"
          value={credit}
           onChange={(e)=>setCredit(e.target.value)}
        
          variant="standard"
          required
        />
          <Button variant="contained" onClick={deposite}>Deposite</Button>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        
        </DialogActions>
      </Dialog>
                </Paper>
            </div>


            <div>
                 <Paper style={{padding:"30px"}} elevation={20}>
             
                  <Button variant="contained" onClick={handleClickOpen1}>WITHDRAW</Button>
                  <Dialog open={open1} onClose={handleClose1}>
                  <DialogTitle>Wthdraw Amount</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h3>Available Balance:{balance}</h3>
          Enter Amout Here To WithDraw
          </DialogContentText>
          <TextField
          id="standard-helperText"
          type="Number"
          label="Enter Amount"
          value={draw}
          onChange={(e)=>setDraw(e.target.value)}
        
          variant="standard"
          required
        />
          <Button variant="contained" onClick={withdraw}>Withdraw</Button>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
        
        </DialogActions>
      </Dialog>
                 </Paper>
            </div>
        </div>

       <CustomizedTables props={details}/>


      </div>


    </>
}