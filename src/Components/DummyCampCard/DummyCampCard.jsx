import { Box } from '@mui/material';
import React from 'react';
import styles from "./DummyCampCard.module.css";


function DummyCampCard({dummydata}) {
  return (
    <Box className = {styles.mainCard}>
        <Box><img className = {styles.cardImage} src={dummydata.image}/></Box>
        <Box className = {styles.dummyName}>{dummydata.name}</Box>
        <Box className = {styles.greyText}>
          <Box>{dummydata.desc}</Box>
        </Box>
    </Box>
  )
}

export default DummyCampCard