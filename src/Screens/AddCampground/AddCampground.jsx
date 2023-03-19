import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { get_cities_api, get_state_api } from "../../assets/assets";
import { add_campground_initial_values } from "../../assets/formAssets/initialValues";
import styles from "./AddCampground.module.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { add_campground_validation_schema } from "../../assets/formAssets/validationSchema";

function AddCampground() {
  const [stateData, setStateData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);

  const handleChangeValues = (setFieldValue, name, value) => {
    setFieldValue(name, value);
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
        <Formik
          initialValues={add_campground_initial_values}
          onSubmit={(values) => {
            console.log(values);
          }}
            validationSchema={add_campground_validation_schema}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box className={styles.addMain}>
                <Box className={styles.mainLeft}>
                  <Box>
                    <h2>
                      <i>Campground</i>
                    </h2>
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
                      <Box className={styles.label}>Highlight</Box>
                      <Box>
                        <TextField
                          fullWidth
                          autoComplete="off"
                          placeholder="Enter Camground Name"
                          variant="outlined"
                          
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box className={styles.locationDiv}>
                    <h2>
                      <i>Location</i>
                    </h2>
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
                          }}
                        />
                      </Box>
                      <Box className={styles.errorText}>
                        {errors.pincode && touched.pincode && errors.pincode + "*"}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className={styles.mainRight}>
                  <h2>
                    <i>Images</i>
                  </h2>
                  <Box className={styles.addImageDiv}>

                     {  !values.image1  ?  <IconButton>
                    <label htmlFor="image1">
                      <IoAddCircleOutline />
                      <input
                        onChange={(e) => {
                            handleChangeValues(
                                setFieldValue,
                                "image1",
                                e.target.files[0]
                              );
                        }}
                        id="image1"
                        type={"file"}
                        hidden
                        />
                    </label>
                        </IconButton> : <img className={styles.campImage} src={URL.createObjectURL(values?.image1)}/>}     

                   
                  </Box>
                  <Box className={styles.addImageDiv}>

                     {  !values.image2  ?  <IconButton>
                    <label htmlFor="image2">
                      <IoAddCircleOutline />
                      <input
                        onChange={(e) => {
                            handleChangeValues(
                                setFieldValue,
                                "image2",
                                e.target.files[0]
                              );
                        }}
                        id="image2"
                        type={"file"}
                        hidden
                        />
                    </label>
                        </IconButton> : <img className={styles.campImage} src={URL.createObjectURL(values?.image2)}/>}     

                   
                  </Box>
                  <Box className={styles.addImageDiv}>

                     {  !values.image3  ?  <IconButton>
                    <label htmlFor="image3">
                      <IoAddCircleOutline />
                      <input
                        onChange={(e) => {
                            handleChangeValues(
                                setFieldValue,
                                "image3",
                                e.target.files[0]
                              );
                        }}
                        id="image3"
                        type={"file"}
                        hidden
                        />
                    </label>
                        </IconButton> : <img className={styles.campImage} src={URL.createObjectURL(values?.image3)}/>}     

                   
                  </Box>
                  <Box className={styles.addImageDiv}>

                     {  !values.image4  ?  <IconButton>
                    <label htmlFor="image4">
                      <IoAddCircleOutline />
                      <input
                        onChange={(e) => {
                            handleChangeValues(
                                setFieldValue,
                                "image4",
                                e.target.files[0]
                              );
                        }}
                        id="image4"
                        type={"file"}
                        hidden
                        />
                    </label>
                        </IconButton> : <img className={styles.campImage} src={URL.createObjectURL(values?.image4)}/>}     

                   
                  </Box>
                </Box>
              </Box>
              <Button fullWidth type="submit" variant="contained">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default AddCampground;
