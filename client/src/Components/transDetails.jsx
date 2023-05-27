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
import { useParams } from 'react-router-dom';
import { base_url } from '../Services/API';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function UserTransTable() {
  const [load,setLoad]=React.useState(true);

    const [props,setProps]=React.useState([]);

    const {id}=useParams();

    React.useEffect(()=>{
      setLoad(true)
        console.log(id);
        const token=JSON.parse(localStorage.getItem('token'))||"";
        console.log(token)
        fetch(`${base_url}/ac/trans/${id}`,{
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
            console.log(json);
            setProps(json);
            setLoad(false)
        })

    },[])



  return <>
        {load ?<Box sx={{ width: '100%' }}>
    <LinearProgress />
  </Box>:null}
    
        <TableContainer style={{width:'80%',height:"80vh",margin:'auto'}} component={Paper}>
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
  </>
}