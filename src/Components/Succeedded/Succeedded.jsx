import { Box } from '@mui/system';
import React from 'react';
import {AiOutlineCheckCircle} from "react-icons/ai";
import styles from "./Succeedded.module.css";

function Succeedded() {
  return (
   <Box className={styles.mainCheck}>
        <Box><AiOutlineCheckCircle className={styles.tick}/></Box>
        <Box className={styles.succ}>Payment Successful !</Box>
   </Box>
  )
}

export default Succeedded