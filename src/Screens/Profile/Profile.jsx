import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { style } from "@mui/system";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  get_cities_api,
  get_state_api,
  get_user_api,
  update_user_api,
} from "../../assets/assets";
import { user_initial_values } from "../../assets/formAssets/initialValues";
import { user_validation_schema } from "../../assets/formAssets/validationSchema";
import CustomSnackBar from "../../Components/Snackbar/Snackbar";
import styles from "./profile.module.css";

export const Profile = () => {
  const [showOrSave, setShowOrSave] = useState(true);
  const handleChangeValues = (setFieldValue, name, value) => {
    setFieldValue(name, value);
  };
  const [userData, setUserData] = useState(user_initial_values);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading,setLoading] = useState(true);
  const [stateData, setStateData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const handleEdit = () => {
    setShowOrSave(false);
  };

  const handleCancel = () => {
    setShowOrSave(true);
  };


  const getUser = () => {
    fetch(`${get_user_api}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        res.json().then((res) => {
          handlesetUserData(res);
        });
      })
      .catch((res) => {
        console.log(res);
      })
      .finally((res)=>{
        setLoading(false);
      })
      ;

  };

  const handlesetUserData=(res)=>{
    const user_data = { ...user_initial_values };
          const data = { ...res.user };
          user_data.phone_number = data.phone_number;
          user_data.city = data.location.city;
          user_data.state = data.location.state;
          user_data.address = data.location.address;
          user_data.pincode = data.location.pincode;
          user_data.first_name = data.full_name.split(" ")[0];
          user_data.last_name = data.full_name.split(" ")[1];
          user_data.email = data.email;
          user_data.admin = data.admin;
          setUserData({ ...user_data });
  }


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
  
  const updateUser = (data) => {
    fetch(`${update_user_api}`,{
      method:"PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body:JSON.stringify(data)
    }
    )
      .then((res) => {
        res.json().then((res) => {
          console.log("respionse",res)
          handlesetUserData(res);
          setShowOrSave(true);
          setMessageType("success");
          setSnackBarMessage("Updated Successfully!");
          setSnackBarVisible(!snackBarVisible);
        });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    getState();
    getUser();
  }, []);

  return (
    <>
    <Box className={styles.add_mIN}>
     <CustomSnackBar snackBarVisible={snackBarVisible} messageType={ messageType} message={snackBarMessage}/>
    {isLoading ? <Box className={styles.loaderDiv}><CircularProgress/></Box> :  <Box >
      <Box>
        <Box className={styles.buttonDiv}>
          {!showOrSave ? (
            <Box>
              <Button variant={"outlined"} onClick={handleCancel} color="error">
                Cancel
              </Button>
            </Box>
          ) : (
            <Button variant={"outlined"} onClick={handleEdit}>
              Edit
            </Button>
          )}
        </Box>
      </Box>
      <Box className={styles.profile_main}>
        <Box className={styles.profile_left}>
          <h2>User Information</h2>
          <Box className={styles.genText}>
            Here you can edit public information about yourself.The changes will
            be displayed for other users.
          </Box>

          {!showOrSave ? (
            <Formik
              initialValues={userData}
              onSubmit={(values) => {
                const loc_ation = {
                  address:values.address,city:values.city,state:values.state,pincode:values.pincode
                }
                const arr = ["last_name", "first_name","city","address","state","pincode"];
                const user_data_arr = Object.keys(values).filter((el) => {
                  return !arr.includes(el);
                });
                const user_data = {};
                user_data.full_name =
                  values.first_name + " " + values.last_name;
                user_data_arr.map((el) => {
                  user_data[el] = values[el];
                });
                user_data.location = loc_ation
              

                updateUser(user_data);
              }}
              validationSchema={user_validation_schema}
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
                  <Box className={styles.input_box}>
                    <Box className={styles.name_container}>
                      <Box flex={1}>
                        <Box className={styles.label}>First Name</Box>
                        <Box>
                          <TextField
                            fullWidth
                            onChange={(e) => {
                              handleChangeValues(
                                setFieldValue,
                                "first_name",
                                e.target.value
                              );
                            }}
                            name={"first_name"}
                            type={"text"}
                            value={values.first_name}
                            autoComplete={"off"}
                            size={"small"}
                            placeholder="First Name"
                          />
                          <Box className={styles.errorText}>
                            {errors.first_name &&
                              touched.first_name &&
                              errors.first_name + "*"}
                          </Box>
                        </Box>
                      </Box>
                      <Box flex={1}>
                        <Box className={styles.label}>Last Name</Box>
                        <Box>
                          <TextField
                            fullWidth
                            onChange={(e) => {
                              handleChangeValues(
                                setFieldValue,
                                "last_name",
                                e.target.value
                              );
                            }}
                            name={"last_name"}
                            type={"text"}
                            value={values.last_name}
                            autoComplete={"off"}
                            size={"small"}
                            placeholder="Last Name"
                          />
                          <Box className={styles.errorText}>
                            {errors.last_name &&
                              touched.last_name &&
                              errors.last_name + "*"}
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <Box className={styles.label}>Email</Box>
                      <Box>
                        <TextField
                          onChange={(e) => {
                            handleChangeValues(
                              setFieldValue,
                              "email",
                              e.target.value
                            );
                          }}
                          // type={"email"}
                          autoComplete={"off"}
                          fullWidth
                          size={"small"}
                          disabled
                          value={values.email}
                          placeholder={"Enter Email"}
                          name={"email"}
                        />
                        <Box className={styles.errorText}>
                          {errors.email && touched.email && errors.email + "*"}
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <Box className={styles.label}>Account Type</Box>
                      <TextField
                        fullWidth
                        size="small"
                        disabled
                        value={userData.admin ? "Admin" : "User"}
                      />
                    </Box>

                    <Box>
                      <Box className={styles.label}>Phone Number</Box>
                      <Box>
                        <TextField
                          onChange={(e) => {
                            handleChangeValues(
                              setFieldValue,
                              "phone_number",
                              e.target.value
                            );
                          }}
                          name={"phone_number"}
                          type={"number"}
                          autoComplete={"off"}
                          fullWidth
                          value={values.phone_number}
                          size={"small"}
                          placeholder={"Enter Phone Number"}
                        />
                        <Box className={styles.errorText}>
                          {errors.phone_number &&
                            touched.phone_number &&
                            errors.phone_number + "*"}
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <Box className={styles.label}>State</Box>
                      <Box>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="state"
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
                        <Box className={styles.errorText}>
                          {errors.state && touched.state && errors.state + "*"}
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <Box className={styles.label}>City</Box>
                      <Box>
                        <FormControl id="city" fullWidth>
                          <Select
                            size="small"
                            name="city"
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
                        <Box className={styles.errorText}>
                          {errors.city && touched.city && errors.city + "*"}
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <Box className={styles.account_type}></Box>
                    </Box>

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
                          // type={"email"}
                          autoComplete={"off"}
                          fullWidth
                          size={"small"}
                          value={values.address}
                          placeholder={"Enter Your Address"}
                          maxRows={5}
                          multiline
                          name={"address"}
                        />
                        <Box className={styles.errorText}>
                          {errors.email && touched.email && errors.email + "*"}
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <Box className={styles.label}>Pincode</Box>
                      <Box>
                        <TextField
                          onChange={handleChange}
                          autoComplete={"off"}
                          fullWidth
                          size={"small"}
                          value={values.pincode}
                          placeholder={"Enter Your Pincode"}
                          name={"pincode"}
                          id={"pincode"}
                        />
                        <Box className={styles.errorText}>
                          {errors.pincode &&
                            touched.pincode &&
                            errors.pincode + "*"}
                        </Box>
                      </Box>
                    </Box>

                    <Button
                      style={{ marginTop: "15px" }}
                      variant={"contained"}
                      type={"submit"}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          ) : (
            <Box>
              <Box className={styles.name_container}>
                <Box flex={1}>
                  <Box className={styles.label}>First Name</Box>
                  <TextField
                    fullWidth
                    size="small"
                    disabled
                    value={userData.first_name}
                  />
                </Box>
                <Box flex={1}>
                  <Box className={styles.label}>Last Name</Box>
                  <TextField
                    fullWidth
                    size="small"
                    disabled
                    value={userData.last_name}
                  />
                </Box>
                <Box></Box>
              </Box>
              <Box className={styles.label}>Email</Box>
              <TextField
                fullWidth
                size="small"
                disabled
                value={userData.email}
              />

              <Box>
                <Box className={styles.label}>Account Type</Box>
                <TextField
                  fullWidth
                  size="small"
                  disabled
                  value={userData.admin ? "Admin" : "User"}
                />
              </Box>
              <Box>
                <Box className={styles.label}>Phone Number</Box>
                <TextField
                  fullWidth
                  size="small"
                  disabled
                  value={userData.phone_number}
                />
              </Box>

              <Box>
                <Box className={styles.label}>State</Box>
                <Box>
                  
                    <TextField
                     fullWidth
                      disabled
                      size="small"
                      name="state"
                      value={userData.state}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    />
               
                </Box>
              </Box>

              <Box>
                <Box className={styles.label}>City</Box>
                <Box>
                
                    <TextField
                     fullWidth
                      disabled
                      size="small"
                      name="city"
                      value={userData.city}
                     
                    />
                
                </Box>
              </Box>

              <Box>
                <Box className={styles.account_type}></Box>
              </Box>

              <Box>
                <Box className={styles.label}>Address</Box>
                <Box>
                  <TextField
                    disabled
                    // type={"email"}
                    autoComplete={"off"}
                    fullWidth
                    size={"small"}
                    value={userData.address}
                    maxRows={5}
                    multiline
                    name={"address"}
                  />
                </Box>
              </Box>

              <Box>
                <Box className={styles.label}>Pincode</Box>
                <Box>
                  <TextField
                    autoComplete={"off"}
                    fullWidth
                    size={"small"}
                    disabled
                    value={userData.pincode}
                    name={"pincode"}
                    id={"pincode"}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box className={styles.profile_right}></Box>
      </Box>
      </Box>  }   
      </Box>
    </>

  );
};
