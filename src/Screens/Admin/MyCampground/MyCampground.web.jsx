import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { admin_all_camp_api } from '../../../assets/assets';
import CampCard from '../../../Components/CampCard/CampCard';
import styles from "./MyCampground.module.css";

function MyCampground() {

  const [campgroundData,setCampgroundData] = useState([]);
  const navigate = useNavigate();
  const [loader,setLoading] = useState(true);

  useEffect(()=>{
    getAllCampground();
  },[])

  const getAllCampground = () =>{
      fetch(`${admin_all_camp_api}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          res.json().then((res) => {
            res.length !== 0 && setCampgroundData([...res]);
            console.log(res);
          }) .finally((res)=>{
            setLoading(false);
          });
        })
        .catch((res) => {
          console.log(res);
        })
       
        ;
  
    };


  return (
    <Box>
      {loader ? <Box className = {styles.loadingContainer}><CircularProgress/></Box> :  campgroundData.length != 0 ? <Box className = {styles.allCampground}>{campgroundData.map((el,i)=><CampCard visitor={"true"} cardData={el} key={i}/>)}</Box> : <Box className = {styles.loadingContainer}><Box>No Added Campground</Box><Button onClick={()=>{navigate("/addcampground")}} variant={'outlined'}>Add Campground</Button></Box>}
      
    </Box>
  )
}

export default MyCampground