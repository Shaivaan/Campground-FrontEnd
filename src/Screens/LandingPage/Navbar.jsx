import { Box, Button, IconButton } from '@mui/material'
import React from 'react'
import styles from "./LandingPage.module.css";
import {GiCampingTent} from "react-icons/gi";
import { useNavigate } from 'react-router-dom';


function LandingNavbar() {
  const navigate = useNavigate();
  return (
    <Box className={styles.landNav}>
        <Box className={styles.logiDiv}>
            <GiCampingTent className={styles.navLogo}/>
            <Box>Camping Cubs</Box>
        </Box>
        <Box className={styles.navButtonDiv}>
            {/* <Box>Explore</Box> */}
            {/* <Box>Terms & Conditions</Box> */}
            <Box><Button onClick={()=>navigate("/login")} style={{color:"grey"}} variant='text' color='info'>Login</Button></Box>
            <Box><Button onClick={()=>navigate("/register")} style={{color:"grey"}} variant='text' color='info'>Register</Button></Box>
        </Box>
    </Box>
  )
}

export default LandingNavbar