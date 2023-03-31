import {
  Button,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { explore_campgrounds_api } from "../../../assets/assets";
import CampCard from "../../../Components/CampCard/CampCard";
import styles from "./ExploreCamps.module.css";
import { FiFilter } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useGeolocated } from "react-geolocated";
let interval;
const debouncingTime = 700;

function ExploreCamps() {


  const [filter, setFilter] = useState({
    filters: {
      maxPrice: 15000,
      minPrice: 1000,
      minRating: 0,
      maxRating: 5,
      rentals: ["cottage", "tent"],
      overallRating: "no",
      price: "no",
      visitCount: "no",
      latitude: "",
      longitude:"",
      distance:"no"
    },
    query: "",
  });

  const [campgroundData, setCampgroundData] = useState([]);
  const [loader, setLoader] = useState(true);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
  });


  useEffect(() => {
    getUserCampgrounds();
  }, []);
  
  useEffect(() => {
    debouncer();
  }, [filter.query]);

  const handleCampgroundChange = (e) => {
    setFilter({ ...filter, query: e.target.value });
  };

  const debouncer = () => {
    if (interval) clearTimeout(interval);
    interval = setTimeout(() => {
      getUserCampgrounds();
    }, debouncingTime);
  };

  const clearSearchInput=()=>{
    setFilter({ ...filter, query: "" });
  }

  const getUserCampgrounds = () => {
    setLoader(true);
    fetch(`${explore_campgrounds_api}`, {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        res
          .json()
          .then((res) => {
            setCampgroundData([...res.data]);
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
      <Box>
        <Box className={styles.filterCont}>
          <Box width={"60%"}>
            <TextField
             value={filter.query}
              InputProps={{
                endAdornment: <>{filter.query.trim().length != 0 && <IconButton onClick={clearSearchInput}><AiOutlineCloseCircle/></IconButton>}</>,
                
              }}
              onChange={handleCampgroundChange}
              fullWidth
              size="small"
              autoComplete="off"
              placeholder="Search by Name"
            />
          </Box>
          <Box>
            <FilterPopover
             getCamps = {getUserCampgrounds}
              value={filter}
              filter={filter.filters}
              setFilter={setFilter}
              geolocation= {{coords,isGeolocationAvailable,isGeolocationEnabled}}
            />
          </Box>
        </Box>
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
              <Box>No Added Campground</Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

const FilterPopover = ({ filter, setFilter, value,getCamps,geolocation }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rentals, setRentals] = useState(JSON.stringify(["cottage", "tent"]));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply=()=>{
    handleClose();
    getCamps();
  }

  useEffect(()=>{
    geolocation.coords && setFilter({...value,filters:{...value.filters,longitude:geolocation.coords.longitude,latitude:geolocation.coords.latitude}})
  },[geolocation.coords])


  const handleChange = (e) => {
    e.target.id &&
      setFilter({
        ...value,
        filters: { ...value.filters, [e.target.id]: Number(e.target.value)},
      });
    e.target.name &&
      e.target.name !== "rentals" &&
      setFilter({
        ...value,
        filters: { ...value.filters, [e.target.name]: e.target.value },
      });

    if (e.target.name == "rentals") {
      setRentals(e.target.value);
      setFilter({
        ...value,
        filters: {
          ...value.filters,
          [e.target.name]: JSON.parse(e.target.value),
        },
      });
    }

    // e.target.name == "distance" && setFilter({...value,filters:{...value.filters,longitude:geolocation.coords.longitude,latitude:geolocation.coords.latitude}});


  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        size="large"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <FiFilter style={{ marginRight: "15px" }} /> Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box className={styles.popOverContainer}>
          <Box className={styles.popChild}>
            <Box className={styles.head}>Filter</Box>
            <Box className={styles.price}>
              <Box flex={1}>
                <Box>Min Price*</Box>
                <Box>
                  <TextField
                    
                    id="minPrice"
                    type={"number"}
                    value={filter.minPrice}
                    size="small"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Enter Min price"
                  />
                </Box>
              </Box>
              <Box flex={1}>
                <Box>Max Price*</Box>
                <Box>
                  <TextField
                    id="maxPrice"
                    type={"number"}
                    value={filter.maxPrice}
                    size="small"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Enter Max price"
                  />
                </Box>
              </Box>
            </Box>

            <Box className={styles.price}>
              <Box flex={1}>
                <Box>Min Rating*</Box>
                <Box>
                  <TextField
                    id="minRating"
                    onChange={handleChange}
                    value={filter.minRating}
                    fullWidth
                    size="small"
                    autoComplete="off"
                    placeholder="Enter Min rating"
                  />
                </Box>
              </Box>
              <Box flex={1}>
                <Box>Max Rating*</Box>
                <Box>
                  <TextField
                    id="maxRating"
                    onChange={handleChange}
                    value={filter.maxRating}
                    fullWidth
                    size="small"
                    autoComplete="off"
                    placeholder="Enter Max rating"
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Rentals
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="rentals"
                  name="rentals"
                  value={rentals}
                  label="Select Rentals"
                  onChange={handleChange}
                >
                  <MenuItem value={JSON.stringify(["cottage"])}>
                    Cottage
                  </MenuItem>
                  <MenuItem value={JSON.stringify(["tent"])}>Tent</MenuItem>
                  <MenuItem value={JSON.stringify(["cottage", "tent"])}>
                    Both
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Sort by Price
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="price"
                  name="price"
                  value={filter.price}
                  label="Sort by price"
                  onChange={handleChange}
                >
                  <MenuItem value={"no"}>None</MenuItem>
                  <MenuItem value={1}>Low To High</MenuItem>
                  <MenuItem value={-1}>High To Low</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Sort by Rating
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="overallRating"
                  name="overallRating"
                  value={filter.overallRating}
                  label="Sort by Rating"
                  onChange={handleChange}
                >
                  <MenuItem value={"no"}>None</MenuItem>
                  <MenuItem value={1}>Low To High</MenuItem>
                  <MenuItem value={-1}>High To Low</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Sort by Visit Count
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="visitCount"
                  name="visitCount"
                  value={filter.visitCount}
                  label="Sort by Visit Count"
                  onChange={handleChange}
                >
                  <MenuItem value={"no"}>None</MenuItem>
                  <MenuItem value={1}>Low To High</MenuItem>
                  <MenuItem value={-1}>High To Low</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
           
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Sort by Distance
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="distance"
                  name="distance"
                  value={filter.distance}
                  label="Sort by Distance"
                  disabled={!geolocation.isGeolocationEnabled}
                  onChange={handleChange}
                >
                  <MenuItem value={"no"}>None</MenuItem>
                  <MenuItem value={1}>Low To High</MenuItem>
                  <MenuItem value={-1}>High To Low</MenuItem>
                </Select>
              </FormControl>
              {!geolocation.isGeolocationEnabled && <Chip label="Enable Location to sort by your distance !" variant="filled" /> } 
            </Box>

            <Box className={styles.price}>
              <Box flex={1}>
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  color="error"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
              <Box flex={1}>
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  color="info"
                  onClick={handleApply}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default ExploreCamps;
