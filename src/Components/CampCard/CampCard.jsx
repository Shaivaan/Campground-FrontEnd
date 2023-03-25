import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import styles from "./CampCard.module.css";
import {GoLocation} from "react-icons/go"
import { useNavigate } from 'react-router-dom';

function CampCard({cardData}) {
  
  const navigate = useNavigate();
  const [activeImage,setActiveImage] = useState(0);
  let changeImage;
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      console.log(activeImage);
      changeImage = setInterval(() => {
         setActiveImage((activeImage) => activeImage == cardData.images.length-1 ? 0 : activeImage+1)   
      }, 1000);
    } else {
      clearInterval(changeImage);
    }
    return () => clearInterval(changeImage);
  }, [isActive]);

  const mouseIn = () => {
    setisActive(() => true);
  };
  const mouseOut = () => {
    setActiveImage(0);
    setisActive(() => false);
  };

  const handleEditNaivate = () =>{
    navigate("/editCampground",{state:{data:cardData}});
  }


  return (
    <Box onMouseEnter={mouseIn} onMouseOut={mouseOut}  className = {styles.mainCard} onClick={handleEditNaivate}>
        <Box><img className = {styles.cardImage} src={cardData.images[activeImage]}/></Box>
        <Box className = {styles.recomm}>Recommended</Box>
        <Box className = {styles.cardName}>{cardData.name}</Box>
        <Box className = {styles.locationDiv}>
          <Box className = {styles.state}><GoLocation/><Box className = {styles.statName}>{cardData.location.city}, {cardData.location.state}</Box></Box>
          <Box>₹ {cardData.price}</Box>
        </Box>
    </Box>
  )
}

export default CampCard;