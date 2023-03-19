import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { get_cities_api, get_state_api } from '../../assets/assets';
import { add_campground_initial_values } from '../../assets/formAssets/initialValues';
import styles from "./AddCampground.module.css";

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
            //   validationSchema={user_validation_schema}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box className={styles.addMain}>
                     <Box className = {styles.mainLeft}>

                        <Box>

                        
                        <h2><i>Campground</i></h2>
                        <Box >
                            <Box className = {styles.label}>Name</Box>
                            <Box>
                                <TextField fullWidth onChange={handleChange} autoComplete='off' placeholder='Enter Camground Name' variant='outlined' id='name' name='name'/>
                            </Box>
                        </Box>
                        <Box>
                            <Box className = {styles.label}>Description</Box>
                            <Box>
                            <TextField fullWidth onChange={handleChange} autoComplete='off' placeholder='Enter Camground Description' variant='outlined' id='description' name='description'/>
                            </Box>
                        </Box>
                        <Box>
                            <Box className = {styles.label}>Price (in ₹)</Box>
                            <Box>
                            <TextField fullWidth onChange={handleChange} autoComplete='off' placeholder='Enter Camground Price' variant='outlined' id='price' name='price'/>
                            </Box>
                        </Box>
                        <Box>
                            <Box className = {styles.label}>Highlight</Box>
                            <Box>
                            <TextField fullWidth autoComplete='off' placeholder='Enter Camground Name' variant='outlined' id='' name=''/>
                            </Box>
                        </Box>
                        </Box>

                        <Box className={styles.locationDiv}>
                        <h2><i>Location</i></h2>
                        <Box>
                            <Box className={styles.label}>Address</Box>
                            <Box><TextField placeholder='Enter Camgpround Address' fullWidth autoComplete='off' id={"address"} name={"address"} /></Box>
                        </Box>
                        <Box>
                            <Box className={styles.label}>State</Box>
                            <Box> <FormControl fullWidth>
                          <Select
                            name="state"
                            // value={values.state}
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
                        </FormControl></Box>
                        </Box>
                        <Box>
                            <Box className={styles.label}>City</Box>
                            <Box> <FormControl id="city" fullWidth>
                          <Select
                            
                            name="city"
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
                        </Box>
                        <Box>
                            <Box className={styles.label}>Pincode</Box>
                            <Box><TextField placeholder='Enter Camgpround Pincode' fullWidth autoComplete='off' id={"pincode"} name={"pincode"} /></Box>
                        </Box>
                        </Box>

                     </Box>
                     <Box className={styles.mainRight}>
                        <h2><i>Images</i></h2>
                        <Box className={styles.addImageDiv}></Box>
                        <Box className={styles.addImageDiv}></Box>
                        <Box className={styles.addImageDiv}></Box>
                        <Box className={styles.addImageDiv}></Box>
                     </Box>
                  </Box>
                  <Button fullWidth type='submit' variant='contained'>Submit</Button>
                </form>
              )}
            </Formik>
        </Box>
    </>
  )
}

export default AddCampground