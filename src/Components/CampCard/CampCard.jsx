import { Box } from '@mui/material';
import React from 'react'
import styles from "./CampCard.module.css";
import {GoLocation} from "react-icons/go"

function CampCard({cardData}) {
  return (
    <Box className = {styles.mainCard}>
        <Box><img className = {styles.cardImage} src={cardData.image1}/></Box>
        <Box className = {styles.cardName}>{cardData.name}</Box>
        <Box className = {styles.locationDiv}>
          <Box className = {styles.state}><GoLocation/>{cardData.city}, {cardData.state}</Box>
          <Box>₹ {cardData.price}</Box>
        </Box>
    </Box>
  )
}

export default CampCard