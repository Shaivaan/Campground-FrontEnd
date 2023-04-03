import React, { useEffect, useState } from "react";
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
import { clientId, google_auth, login_api, logo } from "../../../assets/assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login_validation_schema } from "../../../assets/formAssets/validationSchema";
import { login_initial_values } from "../../../assets/formAssets/initialValues";
import { Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";

function Login() {
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
    const data= {
      email: GoogleUser.profileObj.email,
      password:GoogleUser.Ca
    }
     handleLogin(data);

  };

  const onFailure = (error) => {
    console.error(error);
  };



  const LoginButton=()=>{
    return     <GoogleLogin
    render={(renderProp) => {
      return (
        <Button variant={"outlined"} fullWidth onClick={renderProp.onClick} disabled={renderProp.disabled}>
        <FcGoogle className={styles.googleIcon} />
        Login With Google
      </Button>
      );
    }}
    clientId={clientId}
    buttonText="Login with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}/>
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
      localStorage.setItem("token",res.token);
      localStorage.setItem("isAdmin",res.user.admin);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const handleChangeValues = (setFieldValue, name, value) => {
    setFieldValue(name, value);
  };

  const handleGoogleAuth = ()=>{
  window.location.href = "http://camp-ground-csyy.onrender.com/auth/google";
  }


  useEffect(()=>{
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
         clientId,
      });
    });
    console.log(import.meta.env.VITE_BASE_URL);
  },[])

  return (
    <>
    <Box className={styles.main}>
      <Box className={styles.auth_left}>
      </Box>
      <Box className={styles.auth_right}>
        <Box className={styles.logoBox}><img className={styles.small_logo} src={logo} /></Box>
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
            setFieldValue,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Box className={styles.input_box}>
                <Box>
                  <Box className={styles.label}>Email</Box>
                  <Box>
                    <TextField
                      onChange={(e) => {
                        handleChangeValues(
                          setFieldValue,
                          "email",
                          e.target.value.trim()
                        );
                      }}
                      autoComplete={"off"}
                      fullWidth
                      value={values.email.trim()}
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
                      onChange={(e) => {
                        handleChangeValues(
                          setFieldValue,
                          "password",
                          e.target.value.trim()
                        );
                      }}
                      value={values.password.trim()}
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
               
                <LoginButton/>
                <Box className={styles.centerAlign}>
                  Need an account? <Link to={"/register"}>Register</Link>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    
    </Box>
    <Box className = {styles.parallel}> </Box>
    <Snackbar
     style={{zIndex:3}}
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
      </Snackbar>
    </>
  );
}

export default Login;
