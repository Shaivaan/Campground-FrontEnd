import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { get_all_bokked_trips } from "../../../assets/assets";
import styles from "./Booking.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import BookingCard from "../../../Components/BookingCard/BookingCard";

function Booking() {
  const [loader, setLoader] = useState(true);
  const [campgroundData, setCampgroundData] = useState({});
  const [alignment, setAlignment] = useState("upcomingTrips");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const getBokedTrips = () => {
    setLoader(true);
    fetch(`${get_all_bokked_trips}`, {
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
            setCampgroundData({ ...res });
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
    getBokedTrips();
  }, []);

  return (
    <Box>
      {loader ? (
        <Box className={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <ToggleButtonGroup
            color="success"
            value={alignment}
            exclusive
            size="large"
            fullWidth
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton color="info" value="upcomingTrips">
              Upcoming Trips ({campgroundData["upcomingTrips"]?.length})
            </ToggleButton>
            <ToggleButton color="info" value="currentTrip">
              Current Trips ({campgroundData["currentTrip"]?.length})
            </ToggleButton>
            <ToggleButton color="info" value="previousTrips">
              Previous Trips ({campgroundData["previousTrips"]?.length})
            </ToggleButton>
          </ToggleButtonGroup>

          <Box className={styles.butContier}></Box>

          <Box className={campgroundData[alignment]?.length != 0 ? styles.allCampground:styles.loadingContainer}>
            {campgroundData[alignment]?.length != 0 ? (
              campgroundData[alignment]?.map((el) => {
                return <BookingCard bookingType={alignment} cardData={el.campId} data={el} />;
              })
            ) : (
              <Box>
                <Box>No Booking Till Now</Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}


export default Booking;
