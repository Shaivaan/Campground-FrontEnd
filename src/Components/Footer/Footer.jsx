import { Box } from "@mui/system";
import React from "react";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <Box className={styles.footerMain}>
      <Box className={styles.eachBLck}>
        <Box>COMPANY</Box>
        <Box>About Us</Box>
        <Box>Blogs</Box>
        <Box>Events</Box>
        <Box>Careers</Box>
        <Box>Frequently Asked Questions</Box>
        <Box></Box>
        <Box>© 2023 Camp Ground. All rights reserved.</Box>
        <Box>Privacy. Terms</Box>
      </Box>
      <Box className={styles.eachBLck}>
        <Box>CAMPSITE NEAR</Box>
        <Box>Pune</Box>
        <Box>Bangalore</Box>
        <Box> Sakleshpur</Box>
        <Box> Coorg</Box>
        <Box> Gokarna</Box>
        <Box> Mumbai</Box>
        <Box> Chikmagalur</Box>
        <Box> Kodaikanal</Box>
        <Box> Idukki</Box>
      </Box>
      <Box className={styles.eachBLck}>
        <Box>Follow Us</Box>
        <Box className={styles.socialMedia}>
            <Box><AiFillYoutube style={{fontWeight:"bolder",fontSize:"20px"}}/></Box>
            <Box><AiFillInstagram style={{fontWeight:"bolder",fontSize:"20px"}}/></Box>
            <Box><AiOutlineTwitter style={{fontWeight:"bolder",fontSize:"20px"}}/></Box>
            <Box><AiFillFacebook style={{fontWeight:"bolder",fontSize:"20px"}}/></Box>
        </Box>
      </Box>
      <Box className={styles.eachBLck}>
          <Box>CONTACT US</Box>
          <Box>9600 12121</Box>
          <Box>info@campground.com</Box>
          <Box>27 Main Road HSR Layout Sector 1, Bangalore 560102</Box>
        </Box>
    </Box>
  );
}

export default Footer;
