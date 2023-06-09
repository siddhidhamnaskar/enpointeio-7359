import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {formatISO9075} from "date-fns";
import {useNavigate} from "react-router-dom"
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





export default function CustomizedTables({props}) {


  const navigate=useNavigate();


  const logout=()=>{
    localStorage.setItem('token',"");
    navigate("/");
    
  }

  return (
    <TableContainer style={{width:'80%',height:"100vh",margin:'auto',marginTop:"20px"}} component={Paper}>
          <Button variant="contained" style={{width:"20%",display:"flex",alignSelf:"self-end",marginTop:"10px"}} onClick={logout}>LOGOUT</Button>
        <h2>Transaction Details</h2>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date & Time</StyledTableCell>
            <StyledTableCell align="right">Deposite</StyledTableCell>
            <StyledTableCell align="right">Withdrawl</StyledTableCell>
            <StyledTableCell align="right">Balance</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
              <time>{formatISO9075(new Date(row.createdAt))}</time>
              </StyledTableCell>
              <StyledTableCell align="right">{row.Deposite}</StyledTableCell>
              <StyledTableCell align="right">{row.Withdraw}</StyledTableCell>
              <StyledTableCell align="right">{row.Balance}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}