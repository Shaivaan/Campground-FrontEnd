import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import styles from "../Authentication.module.css";
import {  login_api, logo_image, small_logo } from "../../../assets/assets";
import { forgot_password_schema, otp_schema } from "../../../assets/formAssets/validationSchema";
import { forgot_password_otp, forgot_password_values} from "../../../assets/formAssets/initialValues";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';

function ForgotPassword() {
    const navigate = useNavigate();
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [otpVisible,setOtpVisible] = useState(false);
  const [resetPassword,setResetPassword] = useState(false);


  const TransitionRight = (props) => {
    return <Slide {...props} direction="right" />;
  };

  const handleSnackBarClose = () => {
    setSnackBarVisible(false);
  };

 
  const handleForgotPassword = (data) => {
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


  const handlePresentInput = ()=>{
    if(!resetPassword){
        return <>
            
        </>
    }
  }

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


  return (
    <>
    <Box className={styles.main}>
      <Box className={styles.auth_left}>
      </Box>
      <Box className={styles.auth_right}>
        <Formik
          initialValues={ !otpVisible? forgot_password_values : forgot_password_otp}
          onSubmit={(values) => {
            console.log(values)
            // handleForgotPassword(values);
          }}
          validationSchema={ !otpVisible? forgot_password_schema : otp_schema}
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Box className={styles.input_box}>

                {  otpVisible ? !resetPassword && <Box>
                  <Box className={styles.label}>Enter Otp</Box>
                  <Box>
                    <TextField
                      name = {"otp"}
                      onChange={handleChange}
                      autoComplete={"off"}
                      fullWidth
                      size={"small"}
                      placeholder={"Enter OTP"}
                    />
                    <Box className={styles.errorText}>
                      {errors.otp && touched.otp && errors.otp + "*"}
                    </Box>
                  </Box>
                </Box> : !resetPassword &&  <Box>
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
                </Box>}
             

              { !otpVisible ? !resetPassword &&  <Button
                  style={{ marginTop: "15px" }}
                  variant={"contained"}
                  type={"submit"}
                  fullWidth
                >
                  Next
                </Button> : !resetPassword && <Button
                  style={{ marginTop: "15px" }}
                  variant={"contained"}
                  fullWidth
                  type="submit"
                >
                  Verify
                </Button>}

               {resetPassword && <><Box>
                <Box className={styles.label}>Reset Password</Box>
                    <TextField
                     
                      autoComplete={"off"}
                      fullWidth
                      size={"small"}
                      placeholder={"Reset Password"}
                      
                    />
                  </Box><Button
                  style={{ marginTop: "15px" }}
                  variant={"contained"}
                  fullWidth
                >
                  Reset
                </Button></>}


              </Box>
            </form>
          )}
        </Formik>
      </Box>
      <Snackbar
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
    </Box>
    <Box className = {styles.parallel}></Box>
    </>
  );
}

export default ForgotPassword;
