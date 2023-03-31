import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { get_all_wishlist_api } from '../../../assets/assets';
import CampCard from '../../../Components/CampCard/CampCard';
import styles from "./Wishlist.module.css";

function Wishlist() {

    const [campgroundData, setCampgroundData] = useState([]);
    const [loader, setLoader] = useState(true);


    const getWishlist = () => {
        setLoader(true);
        fetch(`${get_all_wishlist_api}`, {
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
                setCampgroundData([...res]);
              })
              .finally((res) => {
                setLoader(false);
              });
          })
          .catch((res) => {
            console.log(res);
          });
      };


      useEffect(() => {
        getWishlist();
      }, []);

  return (
    <Box>
    {loader ? (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    ) : campgroundData.length != 0 ? (
      <Box className={styles.allCampground}>
        {campgroundData.map((el, i) => (
          <CampCard cardData={el} visitor={"false"} campgroundData={campgroundData} setCampgroundData={setCampgroundData} key={i} />
        ))}
      </Box>
    ) : (
      <Box className={styles.loadingContainer}>
        <Box>Oops! Your Wishlist is Empty</Box>
      </Box>
    )}
  </Box>
  )
}

export default Wishlist;