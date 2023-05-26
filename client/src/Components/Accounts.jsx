
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { base_url } from '../Services/API';
import { Link } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function BasicTable() {
  const [rows,setRow]=React.useState([]);


  React.useEffect(()=>{
    const token=JSON.parse(localStorage.getItem('token'))||""
     fetch(`${base_url}/users`,{
        method:"GET",
        headers:{
            "authorization":`${token}`,
            "Content-Type":"application/json"
        }
     })
     .then((res)=>{
        return res.json();
     })
     .then((json)=>{
        setRow(json)
     })



  })





  return (
    <TableContainer style={{width:"50%",margin:"auto",marginTop:"30px"}} component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Details</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="right">{row.Email}</TableCell>
              <TableCell align="right"><Link to={`/trans/${row._id}`}><Button>View</Button></Link></TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}