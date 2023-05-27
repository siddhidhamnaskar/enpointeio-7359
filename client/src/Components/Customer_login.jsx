import {Paper,TextField, Typography ,Button} from '@mui/material';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
 import { useNavigate } from "react-router-dom";
 import { base_url } from '../Services/API';
 import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

 import { useContext } from 'react';
import { tokenContext } from './Context';
export default function Customer(){

  const [user, setUser]=useState({Email:"",Password:""});
  const  [disabled, setDisabled]=useState(true);
  const [load,setLoad]=useState(false);
  const {token,setToken}=useContext(tokenContext)
   const navigate=useNavigate();
  

  useEffect(()=>{
    if(user.Email.length>0 && user.Password.length>7)
    {
      setDisabled(false);
    }

  })

  const handleInput=(e)=>{
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })

  }

  const login=(e)=>{
    e.preventDefault();
    setLoad(true);
     fetch(`${base_url}/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user),
      
     })
     .then((res)=>{
       res.json().then((data)=>{
        if(data==="Wrong Credintials")
        {
          setLoad(false)
          alert("Wrong Credintials");
          
        }
        else
        {
          localStorage.setItem('token',JSON.stringify(data));
          setToken(data);
          setLoad(false)
          alert("Login Successfull");
        navigate("/transactions");
        }
     
       })
      
     })
     .catch((err)=>{
      alert("Login Failed");
     })

  }



  const formstyle={
   
    display:"flex",
    flexDirection:"column",
    width:"100%" ,
    height:"70vh", 
    alignItems:"center",
    justifyContent:"center",
   
    
   }

   const inputstyle={
       width:"90%",
       marginBottom:"30px",
    
   }
   const paperStyle={
       width:"360px",
       height:"500px",
       margin:"auto",
       marginTop:"50px",
       display:"flex",
       flexDirection:"column",
       alignItems:"center",
       justifyContent:"center"
       // border:"1px solid black",

   }



  return <>
  <div style={{width:"40%",margin:"auto"}}>
  <Paper sx={{width:'100%',height:"90vh"}} elevation={20}>
    {load ?<Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>:null}
  <Typography align="center" style={{paddingTop:"50px",fontSize:"23px", fontWeight:"bold",marginBottom:"-50px"}}>CUSTOMERS LOGIN</Typography>
             <form style={formstyle}>

                      
     
          
     <TextField
    required
    id="outlined-required"
    type="email"
    label="Email"
    name="Email"
    value={user.Email}
    onChange={handleInput}
    placeholder="Enter Your Email"
    style={inputstyle} 
  />
     <TextField
    required
    id="outlined-required"
    type="password"
    label="Password"
    name="Password"
    value={user.Password}
    onChange={handleInput}
    placeholder="Enter Your Password"
    style={inputstyle} 
  />
     <Button variant="contained" disabled={disabled} onClick={login}>LOGIN</Button>
  </form>
  <p>Don't have any account?</p><Link to={"/signup"}>SignUp</Link>

  </Paper>
  </div>
  
  </>
}
