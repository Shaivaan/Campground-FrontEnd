import {
  Box,
  CircularProgress,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./Suggestion.module.css";
import { suggested_camps_api } from "../../../assets/assets";
import { useGeolocated } from "react-geolocated";
import CampCard from "../../../Components/CampCard/CampCard";

function Suggestion() {
  const [value, setValue] = React.useState(1);
  const [loader, setLoader] = useState(false);
  const [suggestedForCamps, setSuggestedForCamps] = useState([]);
  const [suggestedCampgroundData, setSuggestedCampgroundData] = useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFormat = (event, newFormats) => {
    setSuggestedForCamps(newFormats);
  };

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const setterCampground = (data) => {
    setSuggestedCampgroundData({
      ...suggestedCampgroundData,
      [value]: data,
    });
  };

  useEffect(() => {
    if (coords?.latitude) {
      getSuggestedCampgrounds();
    }
  }, [coords?.latitude, coords?.longitude, suggestedForCamps.length]);

  const getSuggestedCampgrounds = () => {
    setLoader(true);
    const price = suggestedForCamps.map((el) => JSON.parse(el));
    fetch(`${suggested_camps_api}`, {
      method: "POST",
      body: JSON.stringify({
        price: price,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        res
          .json()
          .then((res) => {
            !res.message && setSuggestedCampgroundData({ ...res });
            !res.message && setValue(Object.keys(res)[0]);
          })
          .finally((res) => {
            setLoader(false);
          });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      {isGeolocationEnabled && (
        <Box>
          {Object.keys(suggestedCampgroundData).length !== 0 && (
            <>
              <Box className={styles.tabs} sx={{ bgcolor: "background.paper" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  aria-label="scrollable force tabs example"
                >
                  {Object.keys(suggestedCampgroundData).map((el, i) => {
                    return <Tab value={el} label={`Best In ${el}`} />;
                  })}
                </Tabs>
              </Box>

              <Box className={styles.tabs}>
                <ToggleButtonGroup
                  color="success"
                  fullWidth
                  value={suggestedForCamps}
                  onChange={handleFormat}
                  aria-label="text formatting"
                >
                  <ToggleButton
                    color="info"
                    value={JSON.stringify([1, 1999])}
                    aria-label="bold"
                  >
                    Below 2000
                  </ToggleButton>
                  <ToggleButton
                    color="info"
                    value={JSON.stringify([2000, 3999])}
                    aria-label="italic"
                  >
                    2000-4000
                  </ToggleButton>
                  <ToggleButton
                    color="info"
                    value={JSON.stringify([4000, 5999])}
                    aria-label="underlined"
                  >
                    4000-6000
                  </ToggleButton>
                  <ToggleButton
                    color="info"
                    value={JSON.stringify([6000, 15000])}
                    aria-label="underlined"
                  >
                    Above 6000
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </>
          )}

          {loader ? (
            <Box className={styles.loadingContainer}>
              <CircularProgress />
            </Box>
          ) : Object.keys(suggestedCampgroundData).length != 0 ? (
            <Box className={styles.allCampground}>
              {suggestedCampgroundData[value].map((el, i) => (
                <CampCard
                  setCampgroundData={setterCampground}
                  campgroundData={suggestedCampgroundData[value]}
                  cardData={el}
                  visitor={"false"}
                  key={i}
                />
              ))}
            </Box>
          ) : (
            <Box>No Suggested Camps</Box>
          )}
        </Box>
      )}
      {!isGeolocationEnabled && (
        <Box component={"h2"} className={styles.loadingContainer}>
          Please Enable Your Location
        </Box>
      )}
    </>
  );
}

export default Suggestion;
