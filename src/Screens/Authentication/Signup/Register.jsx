import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import styles from "../Authentication.module.css";
import {
  logo_image,
  register_api,
  small_logo,
  snackMessagePosition,
} from "../../../assets/assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Formik } from "formik";
import { register_validation_schema } from "../../../assets/formAssets/validationSchema";
import { register_initial_values } from "../../../assets/formAssets/initialValues";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState("password");
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const navigate = useNavigate();
  const [messageType, setMessageType] = useState("");

  const handleShowPassword = () => {
    showPassword == "password" && setShowPassword("text");
    showPassword == "text" && setShowPassword("password");
  };

  const handleSnackBarClose = () => {
    setSnackBarVisible(false);
  };

  const TransitionRight = (props) => {
    return <Slide {...props} direction="right" />;
  };

  const handleRegister = (data) => {
    fetch(register_api, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json().then((res) => {
          handleSnackProcess(res);
        });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const handleSnackProcess = (res) => {
    if (res.message) {
      setMessageType("error");
      setSnackBarMessage(res.message);
      setSnackBarVisible(true);
    } else {
      res.user && setMessageType("success");
      setSnackBarMessage("Registered Succesfully");
      setSnackBarVisible(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
    <Box className={styles.main}>
      <Box  className={styles.auth_left}>
        {/* <img src={logo_image} className={styles.logo_image} /> */}
      </Box>
      <Box className={styles.auth_right}>
        <Formik
          initialValues={register_initial_values}
          onSubmit={(values) => {
            const data = { ...values };
            data.full_name = values.first_name + values.last_name;
            if (values.admin == "admin") {
              data.admin = true;
            } else {
              data.admin = false;
            }
            console.log(data);
            handleRegister(data);
          }}
          validationSchema={register_validation_schema}
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
          }) => (
            <form onSubmit={handleSubmit}>
              <Box className={styles.input_box}>
                <Box className={styles.name_container}>
                  <Box>
                    <Box className={styles.label}>First Name</Box>
                    <Box>
                      <TextField
                        onChange={handleChange}
                        name={"first_name"}
                        type={"text"}
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
                  <Box>
                    <Box className={styles.label}>Last Name</Box>
                    <Box>
                      <TextField
                        onChange={handleChange}
                        name={"last_name"}
                        type={"text"}
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
                      onChange={handleChange}
                      type={"email"}
                      autoComplete={"off"}
                      fullWidth
                      size={"small"}
                      placeholder={"Enter Email"}
                      name={"email"}
                    />
                    <Box className={styles.errorText}>
                      {errors.email && touched.email && errors.email + "*"}
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Box className={styles.label}>Password</Box>
                  <Box>
                    <TextField
                      onChange={handleChange}
                      type={showPassword}
                      autoComplete={"off"}
                      fullWidth
                      size={"small"}
                      name={"password"}
                      placeholder={"Enter Password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleShowPassword}
                            >
                              {showPassword == "password" ? (
                                <AiOutlineEye />
                              ) : (
                                <AiOutlineEyeInvisible />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box className={styles.errorText}>
                      {errors.password &&
                        touched.password &&
                        errors.password + "*"}
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Box className={styles.label}>Phone Number</Box>
                  <Box>
                    <TextField
                      onChange={handleChange}
                      name={"phone_number"}
                      type={"number"}
                      autoComplete={"off"}
                      fullWidth
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
                  <Box className={styles.label}>Account Type</Box>
                  <RadioGroup
                    onChange={handleChange}
                    value={values.admin}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="admin"
                  >
                    <FormControlLabel
                      value={"user"}
                      control={<Radio />}
                      label="User"
                    />
                    <FormControlLabel
                      value={"admin"}
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="disabled"
                      disabled
                      control={<Radio />}
                      label="other"
                    />
                  </RadioGroup>
                </Box>

                <Button
                  style={{ marginTop: "15px" }}
                  variant={"contained"}
                  type={"submit"}
                  fullWidth
                >
                  Submit
                </Button>
                <Box textAlign={"center"}>
                  Already have an account? <Link to={"/login"}>Login</Link>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
    <Box className = {styles.parallel}>  <Snackbar
        TransitionComponent={TransitionRight}
        open={snackBarVisible}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={messageType}
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar></Box>
    </>
  );
}

export default Register;
