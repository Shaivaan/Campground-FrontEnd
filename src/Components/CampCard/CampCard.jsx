import { Box, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from "./CampCard.module.css";
import {GoLocation} from "react-icons/go"
import { useLocation, useNavigate } from 'react-router-dom';
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai";
import { add_remove_wishlist_api } from '../../assets/assets';
import CustomSnackBar from '../Snackbar/Snackbar';

function CampCard({cardData,setCampgroundData,campgroundData,visitor}) {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [activeImage,setActiveImage] = useState(0);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  let changeImage;
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
    if (isActive) {
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
    visitor == "true" && navigate("/editCampground",{state:{data:cardData}});
    visitor == "false" && navigate("/user/seeCampground",{state:{data:cardData}});
  }


  const addRemoveCampground = (e) => {
    e.stopPropagation();
    fetch(`${add_remove_wishlist_api(cardData._id)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        res
          .json()
          .then((res) => {
           const index = campgroundData.findIndex(x=> x._id === res._id);
           if(location.pathname != "/user/wishlist"){
             const campData = [...campgroundData];
             campData[index] = res;
             setCampgroundData([...campData]);
            }else{  

              const campData = campgroundData.filter((el)=>el._id != res._id)
              setCampgroundData([...campData]);  
            }
            handleSnackMessage(res?.wishlist); 
            
          })
          .finally((res) => {
            
          });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const handleSnackMessage=(boolean)=>{
     boolean && setSnackBarMessage("Added To Favourites")
     !boolean && setSnackBarMessage("Removed From Favourites")
     setMessageType("success") ;
     setSnackBarVisible(!snackBarVisible);
  }

  return (
    <>
    <CustomSnackBar snackBarVisible={snackBarVisible} message={snackBarMessage} messageType={messageType}/>
    <Box onMouseEnter={mouseIn} onMouseOut={mouseOut}  className = {styles.mainCard} onClick={handleEditNaivate}>
        <Box><img className = {styles.cardImage} src={cardData.images[activeImage]}/></Box>
        <Box className = {styles.abcd}>        <Rating name="read-only" value={cardData.overallRating} readOnly />
<Box className = {styles.recomm}> { cardData.recommendation  ? "Recommended" : "‎ " }</Box></Box>
        <Box className = {styles.cardName}>{cardData.name}</Box>
        <Box className = {styles.locationDiv}>
          <Box className = {styles.state}><GoLocation/><Box className = {styles.statName}>{cardData.location.city}, {cardData.location.state}</Box></Box>
          <Box>₹ {cardData.price}</Box>
        </Box>
        {localStorage.getItem("isAdmin") !== "true" && cardData.wishlist !== undefined && <Box onClick={addRemoveCampground} className = {styles.fav}>{!cardData.wishlist ?<AiOutlineHeart  className={styles.favIcoBack}/>: <AiFillHeart className={styles.addedfavIcoBack}/>}</Box>}
    </Box>
    </>
  )
}

export default CampCard;