import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import styles from "./SeeCampground.module.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import GoogleMapReact from "google-map-react";

import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Modal,
  Rating,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { person_book_details } from "../../../assets/formAssets/initialValues";
import { person_campground_book_validation } from "../../../assets/formAssets/validationSchema";
import DetailsCard from "../../../Components/DetailsCard/DetailsCard";
import { fake_payment_api, map_api_key, send_booking_details_api } from "../../../assets/assets";
import FakePayment from "../../../Components/FakePayment/FakePayment";
import Succeedded from "../../../Components/Succeedded/Succeedded";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";

const handleDragStart = (e) => e.preventDefault();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};
const steps = ["Fill Required Details", "Process Payment", "Success"];

function SeeCampground() {
  const location = useLocation();
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 1 },
  };
  const data = location.state.data;
  const map = {lat:data.location.coordinates[0],lng:data.location.coordinates[1]};

  const items = [
    <img
      src={data.images[0]}
      width={"100%"}
      height={"650px"}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src={data.images[1]}
      width={"100%"}
      height={"650px"}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src={data.images[2]}
      width={"100%"}
      height={"650px"}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src={data.images[3]}
      width={"100%"}
      height={"650px"}
      onDragStart={handleDragStart}
      role="presentation"
    />,
  ];



  return (
    <>
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
      <Box className={styles.type}>{data.rentals}</Box>
      <Box className={styles.head}>{data.name}</Box>
      <Box className={styles.locationDiv}>
        <Box>{data.location.address},</Box>
        <Box>{data.location.city},</Box>
        <Box>{data.location.state}</Box>
      </Box>

      {data.recommendation && (
        <Box className={styles.recom}>100% Recommended</Box>
      )}

<iframe
  width="600"
  height="450"
  frameborder="0"
  src={`https://www.google.com/maps/embed/v1/place?key=${map_api_key}&q=${+map.lat},${+map.lng}&zoom=13`}>
</iframe>


      <Box><Rating name="read-only" value={data.overallRating} readOnly /></Box> 
      <Box component={"h3"}>Campground Visited: {data.visitCount}</Box> 

      <Box className={styles.book}>
        <Box className={styles.pricee}>Price: ₹{data.price}</Box>
        <BookModal price={data.price} campId={data._id}/>
      </Box>

      <Box className={styles.desc}>
        <Box component={"h3"}>Description</Box>
        <Box className={styles.descText}>{data.description}</Box>
      </Box>

      <Box className={styles.desc}>
        <Box component={"h3"}>Highlights</Box>
        <Box className={styles.descText}>
          <ol>
            {data.highlight.map((el) => (
              <li>{el}</li>
            ))}
          </ol>
        </Box>
      </Box>
       {data.ratings.length != 0 && <Box component={"h3"}>Review and Ratings</Box>}
      { data.ratings.length != 0 && data.ratings.map((el)=>{
       return <Box className={styles.review}>
          <Box className={styles.rate}>
           <Avatar style={{width:"30px",height:"30px"}}/>
            <Box>{el.userName}</Box>
          </Box>
          <Box><Rating name="read-only" value={el.rate} readOnly /></Box>
          <Box >{el.review}</Box>
        </Box>
      })}
    </>
  );
}

export const BookModal = ({campId,price}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {localStorage.getItem("isAdmin") !== "true" && <Button variant={"contained"} onClick={handleOpen}>
        Book Now
      </Button>}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box textAlign={"right"}><IconButton onClick={handleClose}><AiOutlineCloseCircle/></IconButton></Box>
          <HorizontalLinearStepper price={price} campId={campId}/>
        </Box>
      </Modal>
    </div>
  );
};

function HorizontalLinearStepper({campId,price}) {
  const [value, setValue] = React.useState([dayjs(), dayjs()]);
  const [progress,setProgress] = useState(false);
  const navigate = useNavigate();
  const [priceData,setPriceData] = useState({
    days:1,
    people:1,
    price:price,
    cartId:""
  })
  const [detailstoAdd, setDetailstoAdd] = useState({
    details: [],
    dates: value,
    campId: campId,
    days: 1,
  });

  useEffect(()=>{
    setDetailstoAdd({...detailstoAdd,dates:[...value],days: dayjs(value[1]).diff(dayjs(value[0]), 'day')+1})
  },[value[0],value[1]]) 

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
    activeStep == 0 && sendBookingDetails();
    activeStep == 2 && navigate("/user/explore")
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const sendBookingDetails = ()=>{
    setProgress(true);

   const details = detailstoAdd;
   details.dates[1] = details.dates[1].set('hour', 23).set('minute', 59).set('second',59);

    
    fetch(`${send_booking_details_api}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(details),
    })
      .then((res) => {
        res.json().then((res) => {
          res.details && setPriceData({people:res.details.length,price:price,days:res.days,cartId:res._id})
          setActiveStep(1);
        })
        .finally((res)=>{
          setProgress(false);
        })
        ;
      })
      .catch((res) => {
       
      });
      
  }

  const bookCampgroundApi = ()=>{
    setProgress(true);
    fetch(`${fake_payment_api}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({cartId:priceData.cartId}),
    })
      .then((res) => {
        res.json().then((res) => {
          res.paid && setActiveStep(2);
        })
        .finally((res)=>{
          setProgress(false);
        })
        ;
      })
      .catch((res) => {
       
      });
      
  }


  return (
    <Box sx={{ width: "100%" }}>
      <Stepper sx={{ marginBottom: "40px" }} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep == 0 && (
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
              <DemoItem component="DateRangePicker">
                <DateRangePicker
                  minDate={dayjs()}
                  value={value}
                  localeText={{ start: "Check-in", end: "Check-out" }}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>


          {detailstoAdd.details.length != 0 && <DetailsCard detailstoAdd={detailstoAdd} setDetailstoAdd={setDetailstoAdd} data={detailstoAdd.details}/> }

          <Formik
            initialValues={person_book_details}
            onSubmit={(values, { resetForm }) => {
              setDetailstoAdd({
                ...detailstoAdd,
                details: [...detailstoAdd.details, values],
              });
              resetForm();
            }}
            validationSchema={person_campground_book_validation}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Box className={styles.formCont}>
                  <Box className={styles.flex}>
                    <Box flex={1}>
                      <Box>
                        <Box className={styles.label}>Name</Box>
                        <Box>
                          <TextField
                            onChange={handleChange}
                            autoComplete={"off"}
                            fullWidth
                            value={values.name.trim()}
                            size={"small"}
                            placeholder={"Enter Name"}
                            name={"name"}
                          />
                          <Box className={styles.errorText}>
                            {errors.name && touched.name && errors.name + "*"}
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box flex={1}>
                      <Box>
                        <Box className={styles.label}>Phone Number</Box>
                        <Box>
                          <TextField
                            onChange={handleChange}
                            autoComplete={"off"}
                            fullWidth
                            value={values.phoneNumber.trim()}
                            size={"small"}
                            placeholder={"Enter Phone Number"}
                            name={"phoneNumber"}
                          />
                          <Box className={styles.errorText}>
                            {errors.phoneNumber &&
                              touched.phoneNumber &&
                              errors.phoneNumber + "*"}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box className={styles.flex}>
                    <Box flex={1}>
                      <Box className={styles.label}>Gender</Box>

                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="gender"
                          name="gender"
                          size="small"
                          value={values.gender}
                          onChange={handleChange}
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                      <Box className={styles.errorText}>
                        {errors.gender && touched.gender && errors.gender + "*"}
                      </Box>
                    </Box>
                    <Box flex={1}>
                      <Box className={styles.label}>Age</Box>
                      <Box>
                        <TextField
                          onChange={handleChange}
                          autoComplete={"off"}
                          fullWidth
                          value={values.age}
                          size={"small"}
                          placeholder={"Enter Age"}
                          name={"age"}
                        />
                        <Box className={styles.errorText}>
                          {errors.age && touched.age && errors.age + "*"}
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box className={styles.flex3}>
                    <Box flex={1}>
                      <Box className={styles.label}>Gov Id(Aadhaar)</Box>
                      <Box>
                        <TextField
                          onChange={handleChange}
                          autoComplete={"off"}
                          fullWidth
                          value={values.govId.trim()}
                          size={"small"}
                          placeholder={"Enter Gov* Id"}
                          name={"govId"}
                        />
                        <Box className={styles.errorText}>
                          {errors.govId && touched.govId && errors.govId + "*"}
                        </Box>
                      </Box>
                    </Box>

                    <Box flex={1}>
                      <Button style={{marginBottom:"10px"}} fullWidth variant="outlined" type="submit">
                        Add This Person
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}

      {activeStep == 1 && <FakePayment priceData={priceData} bookCampgroundApi={bookCampgroundApi}/>}
      {activeStep == 2 && <Succeedded/>}
       {progress && <LinearProgress/>}                       
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          {activeStep !=2 &&  <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>}
            <Box sx={{ flex: "1 1 auto" }} />
         {activeStep != 1 && <Button disabled={detailstoAdd.details.length == 0} onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default SeeCampground;
