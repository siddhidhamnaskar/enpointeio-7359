import {Paper,TextField, Typography ,Button} from '@mui/material';
import * as React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {base_url} from '../Services/API';
import { useContext } from 'react';
import { tokenContext } from './Context';
// import LoadingButton from '@mui/lab/LoadingButton';
// import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Banker(){
  
  const [user, setUser]=useState({Email:"",Password:"",Role:"Banker"});
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
          setUser({Name:"",Email:"",Password:"",Role:"Banker"})
          
        }
        else{
          localStorage.setItem('token',JSON.stringify(data));
          setToken(data);
          setLoad(false)
          alert("Login Successfull");
        navigate("/accounts");
        }
       
       })
      
     })
     .catch((err)=>{
      alert("Login Failed");
      setUser({Name:"",Email:"",Password:"",Role:"Banker"})
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
       marginBottom:"30px"

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
  <div  className='bankersLogin'>
  <Paper sx={{width:'100%',height:"90vh",borderRadius:"5px"}} elevation={20}>
  {load ?<Box sx={{ width: '100%',borderRadius:"20px",marginTop:"10px" }}>
      <LinearProgress style={{borderRadius:"20px"}}/>
    </Box>:null}
  
  <Typography className='header' style={{fontSize:"23px",fontWeight:"bold"}} align="center" >BANKERS LOGIN</Typography>
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
  {/* {load ?  <LoadingButton
          size="small"
          color="secondary"
          onClick={handleClick}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Loading</span>
        </LoadingButton>:  <Button variant="contained"  style={{width:"30%"}} disabled={disabled} onClick={login}>LOGIN</Button>} */}
    <Button variant="contained"  style={{width:"30%"}} disabled={disabled} onClick={login}>LOGIN</Button>
  </form>

  <p style={{marginTop:"-60px",color:"gray",fontWeight:"lighter"}}>Don't have any account?</p><Link to={"/bankerSignup"} style={{textDecoration:"none",fontWeight:"bold"}}>SignUp</Link>

  </Paper>
  </div>
  
  </>
}
