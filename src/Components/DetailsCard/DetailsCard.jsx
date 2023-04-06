import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import styles from "./DetailsCard.module.css";

function DetailsCard({data,setDetailstoAdd,detailstoAdd}) {


    const deleteData=(i)=>{
        if (i === 0) {
            setDetailstoAdd({...detailstoAdd, details: data.slice(1)});
          } else {
            const newData = [...data];
            newData.splice(i, 1);
            setDetailstoAdd({...detailstoAdd, details: newData});
          }
    }

  return (
    <>
           <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">GovID</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.govId}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right" ><IconButton onClick={()=>{deleteData(i)}}><AiFillDelete className={styles.delte}/></IconButton> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}


export default DetailsCard