import {
    Button,
    FormControl,
    MenuItem,
    Modal,
    Select,
    TextField,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import { Formik } from "formik";
  import React, { useEffect, useState } from "react";
  import {
    delete_campground_api,
    get_cities_api,
    get_pincode_lat_lon_api,
    get_state_api,
    update_campground_api,
  } from "../../../assets/assets";
  import styles from "./EditCampground.module.css";
  import { add_campground_validation_schema } from "../../../assets/formAssets/validationSchema";
import { useLocation, useNavigate } from "react-router-dom";
import CustomSnackBar from "../../../Components/Snackbar/Snackbar";
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    overflow: "hidden",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    maxHeight: "70vh",
    overflowY: "auto",
  };
  
  function EditCampground() {
    const [stateData, setStateData] = useState([]);
    const location = useLocation();
    const [citiesData, setCitiesData] = useState([]);
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const data = location.state.data;
    const navigate = useNavigate();
    const [initialValues,setInitialValues] = useState({
        name: data.name,
        description: data.description,
        highlight: data.highlight,
        price: data.price,
        city: data.location.city,
        rentals:data.rentals,
        address: data.location.address,
        pincode: data.location.pincode,
        state: data.location.state,
        coordinates: data.location.coordinates, // latitude then longitude order is importent
        image1:data.images[0],
        image2:data.images[1],
        image3:data.images[2],
        image4:data.images[3]
})
    
    const handleChangeValues = (setFieldValue, name, value) => {
      setFieldValue(name, value);
    };
    
    const getLonLat = (pincode, setValue) => {
      fetch(`${get_pincode_lat_lon_api(pincode)}`)
        .then((res) => {
          res.json().then((res) => {
            if (res[0]?.lat && res[0]?.lon) {
              setValue("coordinates", [+res[0]?.lat, +res[0]?.lon]);
            }
          });
        })
        .catch((res) => {
          console.log(res);
        });
    };

    const deleteCampground = () =>{
        fetch(`${delete_campground_api}/${location.state.data._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((res) => {
              res.json().then((res) => {
                
                  setSnackBarMessage("Campground Deleted Successfully!");
                  setMessageType("success");
                  setSnackBarVisible(true);
                  setTimeout(()=>{
                    navigate("/myCampground");
                  },2000)
              });
            })
            .catch((res) => {
                 setSnackBarMessage("Something Went Wrong!");
                  setMessageType("error");
                  setSnackBarVisible(true);
            });
    }
  
    const editCampground = (data,resetForm) => {
      fetch(`${update_campground_api}/${location.state.data._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          res.json().then((res) => {
            
            if(res.name){
              setSnackBarMessage("Campground Edit Successfully!");
              setMessageType("success");
              setSnackBarVisible(true);
              
            }
          });
        })
        .catch((res) => {
          setSnackBarMessage("Something Went Wrong!");
              setMessageType("error");
              setSnackBarVisible(true);
        });
    };

  
    const getState = () => {
      fetch(`${get_state_api}`)
        .then((res) => {
          res.json().then((res) => {
            setStateData([...res.allStates]);
          });
        })
        .catch((res) => {
          console.log(res);
        });
    };
  
    const getCities = (city) => {
      fetch(`${get_cities_api}/${city}`)
        .then((res) => {
          res.json().then((res) => {
            setCitiesData([...res.allCity]);
          });
        })
        .catch((res) => {
          console.log(res);
        });
    };
  
    useEffect(() => {
      getState();
    }, []);
  
    return (
      <>
        <Box>
          <CustomSnackBar snackBarVisible={snackBarVisible} message={snackBarMessage} messageType={messageType}/>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              const dataToSend = {
                name: values.name,
                description: values.description,
                price: +values.price,
                highlight: values.highlight,
                images: [
                  values.image1,
                  values.image2,
                  values.image3,
                  values.image4,
                ],
              };
              dataToSend["location"] = {
                city: values.city,
                address: values.address,
                state: values.state,
                pincode: values.pincode,
                coordinates: values.coordinates,
                type:"Point"
              };
              editCampground(dataToSend,resetForm);
            }}
            validationSchema={add_campground_validation_schema}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box className={styles.addMain}>
                  <Box className={styles.mainLeft}>
                    <Box>
                      <h2>Campground</h2>
                      <Box>
                        <Box className={styles.label}>Name</Box>
                        <Box>
                          <TextField
                            fullWidth
                            value={values.name}
                            onChange={(e) => {
                              handleChangeValues(
                                setFieldValue,
                                "name",
                                e.target.value
                              );
                            }}
                            autoComplete="off"
                            placeholder="Enter Camground Name"
                            variant="outlined"
                            id="name"
                            name="name"
                          />
                        </Box>
                        <Box className={styles.errorText}>
                          {errors.name && touched.name && errors.name + "*"}
                        </Box>
                      </Box>
                      <Box>
                        <Box className={styles.label}>Description</Box>
                        <Box>
                          <TextField
                            multiline
                            minRows={5}
                            fullWidth
                            value={values.description}
                            onChange={(e) => {
                              handleChangeValues(
                                setFieldValue,
                                "description",
                                e.target.value
                              );
                            }}
                            autoComplete="off"
                            placeholder="Enter Camground Description"
                            variant="outlined"
                            id="description"
                            name="description"
                          />
                        </Box>
                        <Box className={styles.errorText}>
                          {errors.description &&
                            touched.description &&
                            errors.description + "*"}
                        </Box>
                      </Box>
                      <Box>
                      <Box className={styles.label}>Campground Type</Box>
                      <Box>
                        <FormControl fullWidth>
                          <Select
                            fullWidth
                            name="rentals"
                            id="rentals"
                            value={values.rentals}
                            onChange={handleChange}
                          >
                            <MenuItem value={"tent"}>Tent</MenuItem>
                            <MenuItem value={"cottage"}>Cottage</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box className={styles.errorText}>
                        {errors.rentals && touched.rentals && errors.rentals + "*"}
                      </Box>
                    </Box>
                      <Box>
                        <Box className={styles.label}>Price (in ₹)</Box>
                        <Box>
                          <TextField
                            value={values.price}
                            fullWidth
                            onChange={(e) => {
                              handleChangeValues(
                                setFieldValue,
                                "price",
                                e.target.value.trim()
                              );
                            }}
                            autoComplete="off"
                            placeholder="Enter Camground Price"
                            variant="outlined"
                            id="price"
                            name="price"
                          />
                        </Box>
                        <Box className={styles.errorText}>
                          {errors.price && touched.price && errors.price + "*"}
                        </Box>
                      </Box>
                      <Box>
                        <Box className={styles.label}>Highlights</Box>
                        <Box>
                          <HighLightModal
                            highlights={values.highlight}
                            setFieldValue={setFieldValue}
                          />
                        </Box>
                      </Box>
                    </Box>
  
                    <Box className={styles.locationDiv}>
                      <h2>Location</h2>
                      <Box>
                        <Box className={styles.label}>Address</Box>
                        <Box>
                          <TextField
                            onChange={(e) => {
                              handleChangeValues(
                                setFieldValue,
                                "address",
                                e.target.value
                              );
                            }}
                            value={values.address}
                            placeholder="Enter Camgpround Address"
                            fullWidth
                            autoComplete="off"
                            id={"address"}
                            name={"address"}
                          />
                        </Box>
                        <Box className={styles.errorText}>
                          {errors.address &&
                            touched.address &&
                            errors.address + "*"}
                        </Box>
                      </Box>
                      <Box>
                        <Box className={styles.label}>State</Box>
                        <Box>
                          {" "}
                          <FormControl fullWidth>
                            <Select
                              name="state"
                              id="state"
                              value={values.state}
                              onChange={(e) => {
                                handleChangeValues(
                                  setFieldValue,
                                  "state",
                                  e.target.value
                                );
                                getCities(e.target.value);
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              {stateData.length !== 0 &&
                                stateData.map((el) => {
                                  return <MenuItem value={el}>{el}</MenuItem>;
                                })}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box className={styles.errorText}>
                          {errors.state && touched.state && errors.state + "*"}
                        </Box>
                      </Box>
                      <Box>
                        <Box className={styles.label}>City</Box>
                        <Box>
                          {" "}
                          <FormControl fullWidth>
                            <Select
                              name="city"
                              id="city"
                              value={values.city}
                              onChange={handleChange}
                              inputProps={{ "aria-label": "Without label" }}
                            >
                            {citiesData.length == 0 && values.city && <MenuItem value = {values.city}>{values.city}</MenuItem>}
                              {citiesData.length !== 0 &&
                                citiesData.map((el) => {
                                  return (
                                    <MenuItem value={el.city}>
                                      {el?.city}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box className={styles.errorText}>
                          {errors.city && touched.city && errors.city + "*"}
                        </Box>
                      </Box>
                      <Box>
                        <Box className={styles.label}>Pincode</Box>
                        <Box>
                          <TextField
                            value={values.pincode}
                            placeholder="Enter Camgpround Pincode"
                            fullWidth
                            autoComplete="off"
                            id={"pincode"}
                            name={"pincode"}
                            onChange={(e) => {
                              handleChangeValues(
                                setFieldValue,
                                "pincode",
                                e.target.value.trim()
                              );
                              e.target.value.trim().length == 6 &&
                                getLonLat(e.target.value, setFieldValue);
                            }}
                          />
                        </Box>
                        <Box className={styles.errorText}>
                          {errors.pincode &&
                            touched.pincode &&
                            errors.pincode + "*"}
                        </Box>
                      </Box>
                    </Box>
                    <h2>Images</h2>
                    <Box>
                      <Box>
                        <Box className={styles.label}>Image 1</Box>
                        <Box>
                          <TextField value={values.image1} autoComplete="off" onChange={(e)=>{handleChangeValues( setFieldValue,"image1",e.target.value)}} placeholder="Add Link1" fullWidth />{" "}
                        </Box>
                        <Box className={styles.errorText}>
                          {errors.image1 && touched.image1 && errors.image1 + "*"}
                        </Box>
                      </Box>
                      <Box>
                        <Box className={styles.label}>Image 2</Box>
                        <Box>
                          <TextField value={values.image2} autoComplete="off" onChange={(e)=>{handleChangeValues( setFieldValue,"image2",e.target.value)}} placeholder="Add Link2" fullWidth />{" "}
                        </Box>
                        <Box className={styles.errorText}>
                          {errors.image2 && touched.image2 && errors.image2 + "*"}
                        </Box>
                      </Box>
                      <Box>
                        <Box className={styles.label}>Image 3</Box>
                        <Box>
                          <TextField value={values.image3} autoComplete="off" onChange={(e)=>{handleChangeValues( setFieldValue,"image3",e.target.value)}} placeholder="Add Link3" fullWidth />{" "}
                        </Box>
                        <Box className={styles.errorText}>
                          {errors.image3 && touched.image3 && errors.image3 + "*"}
                        </Box>
                      </Box>
                      <Box>
                        <Box className={styles.label}>Image 4</Box>
                        <Box>
                          <TextField value={values.image4} autoComplete="off" onChange={(e)=>{handleChangeValues( setFieldValue,"image4",e.target.value)}} placeholder="Add Link4" fullWidth />{" "}
                        </Box>
                        <Box className={styles.errorText}>
                          {errors.image4 && touched.image4 && errors.image4 + "*"}
                        </Box>
                      </Box>
                    </Box>
                     <Box display={"flex"} columnGap={"10px"}>
                    <Button
                      style={{ flex:1,fontWeight:"bold"}}
                      type="submit"
                      variant="contained"
                    >
                      Edit
                    </Button>
                    <Button style={{ flex:1,fontWeight:"bold"}} variant="contained" color="error" onClick={deleteCampground}>Delete</Button>
                     </Box>       
                  </Box>
                  <Box></Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </>
    );
  }
  
  function HighLightModal({ setFieldValue, highlights }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [inputValue, setInputValue] = useState("");
  
    const addHighlight = (value) => {
      setFieldValue("highlight", [...highlights, value]);
      setInputValue("");
    };
  
    return (
      <Box>
        <Button size="large" variant="contained" fullWidth onClick={handleOpen}>
          Add Highlights
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {highlights?.length != 0 && (
              <Box className={styles.highDisplay}>
                {highlights.map((el, i) => {
                  return <Box component={"li"}>{highlights[i]}</Box>;
                })}
              </Box>
            )}
            <Box className={styles.highInpaAndBut}>
              <TextField
                autoComplete={"off"}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                style={{ flex: 3 }}
                placeholder="Add Highlight"
              />
              <Button
                onClick={() => {
                  addHighlight(inputValue);
                }}
                disabled={inputValue.trim().length == 0}
                style={{ flex: 1 }}
                variant="outlined"
              >
                Add
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }
  
  export default EditCampground;
  