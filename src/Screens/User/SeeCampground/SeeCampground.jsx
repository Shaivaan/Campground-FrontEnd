import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import styles from "./SeeCampground.module.css";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {GoLocation} from "react-icons/go"
import { useLocation } from 'react-router-dom';


const handleDragStart = (e) => e.preventDefault();

function SeeCampground() {
    const location = useLocation();    
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 1 },
    };
    const data = location.state.data;
    const items = [
        <img src={data.images[0]} width={"100%"} height={"650px"} onDragStart={handleDragStart} role="presentation" />,
        <img src={data.images[1]} width={"100%"} height={"650px"} onDragStart={handleDragStart} role="presentation" />,
        <img src={data.images[2]} width={"100%"} height={"650px"} onDragStart={handleDragStart} role="presentation" />,
        <img src={data.images[3]} width={"100%"} height={"650px"} onDragStart={handleDragStart} role="presentation" />
      ];

  return (
     <>
        <Box className={styles.carousel}>
        <AliceCarousel autoPlay={true} disableButtonsControls animationType={"slide"} mouseTracking autoPlayInterval={5000} infinite={true} animationDuration={1500} responsive={responsive} items={items} />
        </Box>
        <Box className={styles.type}>
        {data.rentals}
        </Box>
        <Box className={styles.head}>
        {data.name}
        </Box>
        <Box className={styles.locationDiv}>
        <Box>{data.location.address},</Box>
        <Box>{data.location.city},</Box>
        <Box>{data.location.state}</Box>
        </Box>

      {data.recommendation &&  <Box className={styles.recom}>
            100% Recommended
        </Box>}

        <Box className={styles.desc}>
            <Box component={"h3"}>Description</Box>
            <Box className={styles.descText}>{data.description}</Box>
        </Box>

        <Box className={styles.desc}>
            <Box component={"h3"}>Highlights</Box>
            <Box className={styles.descText}><ol>{data.highlight.map((el)=><li>{el}</li>)}</ol></Box>
        </Box>
     </>
  )
}

export default SeeCampground