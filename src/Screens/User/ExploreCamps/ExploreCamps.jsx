import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { explore_campgrounds_api } from '../../../assets/assets';
import CampCard from '../../../Components/CampCard/CampCard';
import styles from "./ExploreCamps.module.css";

function ExploreCamps() {
    const [filter,setFilter] = useState({
        filters:{},
        query:""
    });
    
    const [campgroundData,setCampgroundData] = useState([]);
    const [loader,setLoader] = useState(true);

    useEffect(()=>{
        getUserCampgrounds();
    },[])

    const getUserCampgrounds=()=>{
        fetch(`${explore_campgrounds_api}`, {
            method:"POST",
            body:JSON.stringify(filter),
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-type": "application/json; charset=UTF-8"
            },
          })
            .then((res) => {
               res.json().then((res)=>{
                setCampgroundData([...res.data]);
                
               })
               .finally((res)=>{
                setLoader(false);
            })
            })
            .catch((res) => {
              console.log(res);
            })
            
            ;
    }

  return (
     <>
       <Box>
            <Box></Box>
            <Box>
            {loader ? <Box className = {styles.loadingContainer}><CircularProgress/></Box> :  campgroundData.length != 0 ? <Box className = {styles.allCampground}>{campgroundData.map((el,i)=><CampCard cardData={el} key={i}/>)}</Box> : <Box className = {styles.loadingContainer}><Box>No Added Campground</Box></Box>}

            </Box>
      </Box>     
     </>
  )
}

export default ExploreCamps