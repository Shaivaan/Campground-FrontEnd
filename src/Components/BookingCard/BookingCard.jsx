import { Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "./BookingCard.module.css";
import { GoLocation } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import CustomSnackBar from "../Snackbar/Snackbar";
import { SlCalender } from "react-icons/sl";
import moment from "moment/moment";
import { IoPeopleOutline } from "react-icons/io5";
import AliceCarousel from "react-alice-carousel";
import StarRating from "../Ratings/Rating";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius:"10px",
    boxShadow: 24,
    p: 4,
    maxHeight:"80vh",
    overflowY:"scroll",
  };

function BookingCard({ cardData, data ,bookingType}) {
  const navigate = useNavigate();
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  let changeImage;
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      console.log(activeImage);
      changeImage = setInterval(() => {
        setActiveImage((activeImage) =>
          activeImage == cardData.images.length - 1 ? 0 : activeImage + 1
        );
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

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleSnackMessage = (boolean) => {
    console.log("iddhar", boolean);
    boolean && setSnackBarMessage("Added To Favourites");
    !boolean && setSnackBarMessage("Removed From Favourites");
    setMessageType("success");
    setSnackBarVisible(!snackBarVisible);
  };

  return (
    <>
      <CampModal modalData={data} bookingType={bookingType} open={isModalOpen} handleOpen={handleOpen} handleClose={handleClose}/>
      <CustomSnackBar
        snackBarVisible={snackBarVisible}
        message={snackBarMessage}
        messageType={messageType}
      />
      <Box
        onMouseEnter={mouseIn}
        onMouseOut={mouseOut}
        onClick={handleOpen}
        className={styles.mainCard}
      >
        <Box>
          <img
            className={styles.cardImage}
            src={cardData.images[activeImage]}
          />
        </Box>
        <Box className={styles.recomm}>
          {cardData.recommendation ? "Recommended" : "‎ "}
        </Box>
        <Box className={styles.cardName}>{cardData.name}</Box>
        <Box className={styles.locationDiv}>
          <Box className={styles.state}>
            <GoLocation />
            <Box className={styles.statName}>
              {cardData.location.city}, {cardData.location.state}
            </Box>
          </Box>
          <Box>₹ {cardData.price}</Box>
        </Box>
        <Box className={styles.dates}>
          {" "}
          <Box>
            <SlCalender style={{ marginRight: "10px" }} />
            {moment(data.dates[0]).format("MMMM Do YYYY")}
          </Box>{" "}
          -{" "}
          <Box>
            <SlCalender style={{ marginRight: "10px" }} />
            {moment(data.dates[1]).format("MMMM Do YYYY")}
          </Box>{" "}
        </Box>

        <Box className={styles.group}><IoPeopleOutline/> Trip of {data.details.length} people</Box>
        {cardData.wishlist !== undefined && (
          <Box className={styles.fav}>
            {!cardData.wishlist ? (
              <AiOutlineHeart className={styles.favIcoBack} />
            ) : (
              <AiFillHeart className={styles.addedfavIcoBack} />
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

function CampModal({open,handleClose,modalData,bookingType}) {
    const handleDragStart = (e) => e.preventDefault();
    const responsive = {
        0: { items: 1 },
        568: { items: 1 },
        1024: { items: 1 },
      };
    const items = [
        <img
          src={modalData.campId.images[0]}
          width={"100%"}
          height={"300px"}
          onDragStart={handleDragStart}
          role="presentation"
        />,
        <img
          src={modalData.campId.images[1]}
          width={"100%"}
          height={"300px"}
          onDragStart={handleDragStart}
          role="presentation"
        />,
        <img
          src={modalData.campId.images[2]}
          width={"100%"}
          height={"300px"}
          onDragStart={handleDragStart}
          role="presentation"
        />,
        <img
          src={modalData.campId.images[3]}
          width={"100%"}
          height={"300px"}
          onDragStart={handleDragStart}
          role="presentation"
        />,
      ];

    return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>

            <Box className={styles.carousel}>
           <AliceCarousel
          autoPlay={true}
          disableButtonsControls
          animationType={"slide"}
          mouseTracking
          autoPlayInterval={5000}
          infinite={true}
          animationDuration={1500}
          responsive={responsive}
          items={items}
          />
          </Box>
        
            
           <Box className={styles.modalMain}>
                <Box>
                    <Box className={styles.label}>Campground Name</Box>
                    <Box>{modalData.campId.name}</Box>
                </Box>

                <Box>
                <Box className={styles.label}>Location</Box>
                <Box>
                    <Box component={"span"}>{modalData.campId.location.city + ", "}</Box>
                    <Box component={"span"}>{modalData.campId.location.state}</Box>
                </Box>
                </Box>
                <Box>
                <Box className={styles.label}>Address</Box>
                <Box>{modalData.campId.location.address}</Box>
                </Box>
                <Box>
                <Box className={styles.label}>Price</Box>
                <Box>₹ {modalData.campId.price * modalData.details.length * modalData.days}</Box>
                </Box>

                <Box>
                  <Box className={styles.label}>Member Details</Box>  
                <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">GovID</TableCell>
            <TableCell align="right">Phone Number</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {modalData.details.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.govId}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {bookingType && bookingType === "previousTrips" && <StarRating campId={modalData.campId._id}/>}
                </Box>
           </Box>
          </Box>
        </Modal>
    );
  }

export default BookingCard;
