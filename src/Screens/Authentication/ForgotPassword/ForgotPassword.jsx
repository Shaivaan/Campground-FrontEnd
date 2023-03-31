import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Snackbar, Alert, Slide, IconButton, InputAdornment } from "@mui/material";
import styles from "../Authentication.module.css";
import {
  check_otp_api,
  logo,
  reset_password_api,
  send_opt_api,
} from "../../../assets/assets";
import {
  forgot_password_schema,
  otp_schema,
  password_schema,
} from "../../../assets/formAssets/validationSchema";
import {
  forgot_password_otp,
  forgot_password_values,
  password_initial_values,
} from "../../../assets/formAssets/initialValues";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { style } from "@mui/system";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function ForgotPassword() {
  const navigate = useNavigate();
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  let interval;
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [otpTimer,setOtpTimer] = useState(60);


  const TransitionRight = (props) => {
    return <Slide {...props} direction="right" />;
  };

  const handleSnackBarClose = () => {
    setSnackBarVisible(false);
  };

  const goBack = () => {
    navigate(-1);
  };


  useEffect(() => {
   if(otpVisible && !resetPassword){
    interval = setInterval(() => {
      setOtpTimer(prevTimer => prevTimer - 1);
    }, 1000);
  } 

  if(otpTimer == 0){
    clearInterval(interval);
    setOtpVisible(false);
    setSnackBarMessage("OTP expired")
    setMessageType("error");
    setSnackBarVisible(true);
  }

    // Cleanup function to clear the interval
    return () => {
      clearInterval(interval);
    };
  }, [otpVisible,otpTimer]);

  const handleShowPassword = () => {
    showPassword == "password" && setShowPassword("text");
    showPassword == "text" && setShowPassword("password");
  };

  const handleResetPassword = (data) => {
    data.email = resetEmail;
    fetch(reset_password_api, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.message == "Password Updated Successfully") {
            setSnackBarMessage(res.message);
            setMessageType("success");
            setSnackBarVisible(true);
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const handleSnackProcess = (res) => {
    if (res.message) {
      res.message == "OTP sent successfully"
        ? setMessageType("success")
        : setMessageType("error");
      setSnackBarMessage(res.message);
      setSnackBarVisible(true);
    }
  };

  const handleSendOtp = (data) => {
    fetch(send_opt_api, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json().then((res) => {
          res.message == "OTP sent successfully" && setOtpVisible(true);
          handleSnackProcess(res);
          
        });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const startTimer = () => {
    setInterval(() => {
      setOtpTimer(prevTimer => prevTimer - 1);
     }, 1000);
  }

  const handleCheckOtp = (data) => {
    data.otp = +data.otp;
    fetch(check_otp_api, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.message == "OTP Verified Successfully") {
            setSnackBarMessage(res.message);
            setMessageType("success");
            setSnackBarVisible(true);
            setResetPassword(true);
            setResetEmail(data.email);
            console.log(data);
          } else {
            setSnackBarMessage(res.message);
            res.message = "Invalid OTP" && setMessageType("error") && setTimeout(()=>{
              startTimer()
            },2000);
            setSnackBarVisible(true);
          }
        });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <Box className={styles.main}>
        <Box className={styles.auth_left}></Box>
        <Box className={styles.auth_right}>
        <Box className={styles.logoBox}><img className={styles.small_logo} src={logo} /></Box>
          <Formik
            initialValues={
              !otpVisible ? forgot_password_values : forgot_password_otp
            }
            onSubmit={(values) => {
              !otpVisible && handleSendOtp(values);
              otpVisible && handleCheckOtp(values);

              // handleForgotPassword(values);
            }}
            validationSchema={!otpVisible ? forgot_password_schema : otp_schema}
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
                  {otpVisible
                    ? !resetPassword && (
                        <Box>
                          <Box className={styles.label}>Enter Otp</Box>
                          <Box>
                            <TextField
                              name={"otp"}
                              value={values.otp}
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
                        </Box>
                      )
                    : !resetPassword && (
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
                              {errors.email &&
                                touched.email &&
                                errors.email + "*"}
                            </Box>
                          </Box>
                        </Box>
                      )}

                  {!otpVisible
                    ? !resetPassword && (
                        <Box className={styles.butt_containn}>
                          <Button
                            color="error"
                            style={{ flex: 1, marginRight: "10px" }}
                            fullWidth
                            variant={"contained"}
                            onClick={goBack}
                          >
                            Cancel
                          </Button>
                          <Button
                            style={{ flex: 1 }}
                            variant={"contained"}
                            type={"submit"}
                            fullWidth
                          >
                            Next
                          </Button>
                        </Box>
                      )
                    : !resetPassword && (
                        <Button
                          style={{ marginTop: "15px" }}
                          variant={"contained"}
                          fullWidth
                          type="submit"
                        >
                          Verify
                        </Button>
                      )}

                  {resetPassword && (
                    <>
                      <Formik
                        initialValues={password_initial_values}
                        onSubmit={(values, { setSubmitting }) => {
                          console.log(values);
                          handleResetPassword(values);
                        }}
                        validationSchema={password_schema}
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
                          <form>
                            <Box>
                              <Box className={styles.label}>Reset Password</Box>
                              <TextField
                                name="password"
                                autoComplete={"off"}
                                fullWidth
                                type={showPassword}
                                onChange={handleChange}
                                size={"small"}
                                placeholder={"Reset Password"}
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

                            <Button
                              onClick={handleSubmit}
                              style={{ marginTop: "15px" }}
                              variant={"contained"}
                              fullWidth
                              type="submit"
                            >
                              Reset
                            </Button>
                          </form>
                        )}
                      </Formik>
                    </>
                  )}
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
      <Box className={styles.parallel}>
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
        <Snackbar
          // TransitionComponent={TransitionRight}
          open={otpVisible && !resetPassword}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          autoHideDuration={2000}
          // onClose={handleSnackBarClose}
        >
          <Alert
            // onClose={handleSnackBarClose}
            severity={"info"}
            sx={{ width: "100%" }}
          >
            {`00 : ` + otpTimer + ` seconds`}
          </Alert>
        </Snackbar>
    </>
  );
}

export default ForgotPassword;
