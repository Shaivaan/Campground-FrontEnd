import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import styles from "./CampCard.module.css";
import {GoLocation} from "react-icons/go"
import { useNavigate } from 'react-router-dom';
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai";

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
    localStorage.getItem("isAdmin") == "true" && navigate("/editCampground",{state:{data:cardData}});
    localStorage.getItem("isAdmin") == "false" && navigate("/user/seeCampground",{state:{data:cardData}});
  }


  return (
    <Box onMouseEnter={mouseIn} onMouseOut={mouseOut}  className = {styles.mainCard} onClick={handleEditNaivate}>
        <Box><img className = {styles.cardImage} src={cardData.images[activeImage]}/></Box>
        <Box className = {styles.recomm}>{ cardData.recommendation  ? "Recommended" : "‎ " }</Box>
        <Box className = {styles.cardName}>{cardData.name}</Box>
        <Box className = {styles.locationDiv}>
          <Box className = {styles.state}><GoLocation/><Box className = {styles.statName}>{cardData.location.city}, {cardData.location.state}</Box></Box>
          <Box>₹ {cardData.price}</Box>
        </Box>
        {cardData.wishlist !== undefined && <Box className = {styles.fav}>{!cardData.wishlist ?<AiOutlineHeart className={styles.favIcoBack}/>: <AiFillHeart className={styles.addedfavIcoBack}/>}</Box>}
    </Box>
  )
}

export default CampCard;