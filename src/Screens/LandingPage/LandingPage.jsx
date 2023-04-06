import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyCardData } from '../../assets/__mocks__/mockData';
import DummyCampCard from '../../Components/DummyCampCard/DummyCampCard';
import Footer from '../../Components/Footer/Footer';
import styles from "./LandingPage.module.css";
import LandingNavbar from './Navbar';
import ChatBot from '../../Components/ChatBot/ChatBot';

function LandingPage() {
  const navigate = useNavigate();
  const handleNavigate = ()=>{
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    !token && navigate("/login");
    token && isAdmin == "false" && navigate("/user/explore")
    token && isAdmin == "true" && navigate("/myCampground")
  }

  return (
    <>
        <LandingNavbar/>
        <ChatBot/>
    <Box className = {styles.main}>
        <Box className = {styles.start}>
          <Box className = {styles.container1}>
           <Box className = {styles.headStart}>Camping Cubs</Box>
           <Box className = {styles.title}>A family that camps together, stays together.</Box>
            <Button onClick={handleNavigate} variant='contained' color='secondary'>Explore Camps</Button>
          </Box>
        </Box>


        <Box className = {styles.why}>
          <Box component={"h2"}>Why Camping Cubs ?</Box>
          <Box className = {styles.whyContain}>
            <Box className = {styles.eachCont}>
              <Box component={"h4"}>Your favourite Campround</Box>
              <Box>Campspot lists top-rated camping destinations available for online booking in North America. Discover campgrounds big and small, RV parks, glamping, and more.</Box>
            </Box>
            <Box className = {styles.eachCont}>
              <Box component={"h4"}>Instant booking
</Box>
              <Box>No need to call the campground or wait for your booking to be accepted. We integrate directly with campground reservation systems to confirm bookings instantly.</Box>
            </Box>
            <Box className = {styles.eachCont}>
              <Box component={"h4"}>No membership fees
</Box>
              <Box>Book all listed campgrounds on our app instantly — no membership fee required! Access to all of our campgrounds is completely free and open to the public.</Box>
            </Box>
          </Box>
        </Box>

        <Box className = {styles.whyImpDov}>
          <Box flex={1} className = {styles.whyImpDovText}>
            <Box component={"h4"}>Why Camping is important</Box>
            <Box>
          The feeling of being calm, appreciating the simple things in life and knowing that things do not have to be complex all the time allows one to have a more positive and clearer outlook or perspective in life. Camping also gives one an emotional rest from all the emotional expense from the usual day to day life.
            </Box>
          </Box>
          <Box flex={1} >
          <iframe className={styles.video} src="https://www.youtube.com/embed/12mOC2h4Cms" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </Box>
        </Box>

        <Box className={styles.discover}>
          <Box component={"h2"}>Discover top spots around you</Box>
          <Box marginY={"20px"} className = {styles.greyText}>Choose from a wide variety of accommodations across the best properties in India.</Box>

          <Box className = {styles.recommDivv}>
            {dummyCardData.map((el)=><DummyCampCard dummydata={el}/>)}
              
          </Box>
          </Box>  
        <Footer/>
    </Box>
    </>
  )
}

export default LandingPage