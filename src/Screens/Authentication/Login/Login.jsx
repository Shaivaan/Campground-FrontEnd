import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import styles from "../Authentication.module.css";
import { google_auth, login_api, logo_image, small_logo } from "../../../assets/assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login_validation_schema } from "../../../assets/formAssets/validationSchema";
import { login_initial_values } from "../../../assets/formAssets/initialValues";
import { Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';

function Login() {
  const clientId = '532654142650-g2dd03hso45lf4ev3p692lpnk6j0giet.apps.googleusercontent.com';
  const [showPassword, setShowPassword] = useState("password");
  const navigate = useNavigate();
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const handleShowPassword = () => {
    showPassword == "password" && setShowPassword("text");
    showPassword == "text" && setShowPassword("password");
  };

  const TransitionRight = (props) => {
    return <Slide {...props} direction="right" />;
  };

  const handleSnackBarClose = () => {
    setSnackBarVisible(false);
  };

  const onSuccess = (GoogleUser) => {
    console.log(GoogleUser);
  };

  const onFailure = (error) => {
    console.error(error);
  };

  const LoginButton=()=>{
    return  <GoogleLogin
    clientId={clientId}
    buttonText="Login with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    uxMode={'redirect'}
  />
  }

  const handleLogin = (data) => {
    fetch(login_api, {
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
      setSnackBarMessage("Login Successfully");
      setSnackBarVisible(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const handleGoogleAuth = ()=>{
  // window.location.href = "http://localhost:3000/auth/google";

  }

  return (
    <>
    <Box className={styles.main}>
      <Box className={styles.auth_left}>
      </Box>
      <Box className={styles.auth_right}>
        <Formik
          initialValues={login_initial_values}
          onSubmit={(values) => {
            handleLogin(values);
          }}
          validationSchema={login_validation_schema}
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
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Box className={styles.input_box}>
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
                      name={"password"}
                      size={"small"}
                      placeholder={"Enter Password"}
                      InputProps={{
                        // <-- This is where the toggle button is added.
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
                    <Box className={styles.forPassCont}>
                    <Box className={styles.errorText}>
                      {errors.password &&
                        touched.password &&
                        errors.password + "*"}
                    </Box>
                    <Box>
                      <Link to = "/forgotpassword">Forgot Password?</Link>
                    </Box>      
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
                <Box className={styles.centerAlign}>OR</Box>
                <Button variant={"outlined"} fullWidth onClick={handleGoogleAuth}>
                  <FcGoogle className={styles.googleIcon} />
                  Login With Google
                </Button>
                {/* <LoginButton/> */}
                <Box className={styles.centerAlign}>
                  Need an account? <Link to={"/register"}>Register</Link>
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

export default Login;
