import React, { useEffect, useState } from "react";
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
  Tooltip,
  
} from "@mui/material";
import styles from "../Authentication.module.css";
import {
  clientId,
  logo,
  register_api,
  snackMessagePosition,
} from "../../../assets/assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Formik } from "formik";
import { register_validation_schema } from "../../../assets/formAssets/validationSchema";
import { register_initial_values } from "../../../assets/formAssets/initialValues";
import { Link, useNavigate } from "react-router-dom";
import {TbInfoHexagon} from "react-icons/tb";
import { AccountInfoModal } from "../../../Components/Modals/AccountInfoModal";
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import { FcGoogle } from "react-icons/fc";

function Register() {
  const [showPassword, setShowPassword] = useState("password");
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleShowPassword = () => {
    showPassword == "password" && setShowPassword("text");
    showPassword == "text" && setShowPassword("password");
  };

    useEffect(()=>{
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
         clientId,
      });
    });
  },[])

    const onSuccess = (GoogleUser) => {
    console.log(GoogleUser);
    const data= {
      full_name: GoogleUser.profileObj.name,
      email: GoogleUser.profileObj.email,
      password:GoogleUser.Ca
    }
    handleRegister(data);

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
        Register With Google
      </Button>
      );
    }}
    clientId={clientId}
    buttonText="Login with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}/>
  }

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
      localStorage.setItem("token", res.token);
      localStorage.setItem("isAdmin", res.user.admin);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const handleChangeValues = (setFieldValue, name, value) => {
    setFieldValue(name, value);
  };

  return (
    <>
      <Box className={styles.main}>
        <Box className={styles.auth_left}>
        </Box>
        <Box className={styles.auth_right}>
        <Box className={styles.logoBox}><img className={styles.small_logo} src={logo} /></Box>
          <Formik
            initialValues={register_initial_values}
            onSubmit={(values) => {
              const data = { ...values };
              data.full_name = values.first_name + " " + values.last_name;
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box className={styles.input_box}>
                  <Box className={styles.name_container}>
                    <Box>
                      <Box className={styles.label}>First Name</Box>
                      <Box>
                        <TextField
                          onChange={(e) => {
                            handleChangeValues(
                              setFieldValue,
                              "first_name",
                              e.target.value.trim()
                            );
                          }}
                          name={"first_name"}
                          type={"text"}
                          value={values.first_name.trim()}
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
                          onChange={(e) => {
                            handleChangeValues(
                              setFieldValue,
                              "last_name",
                              e.target.value.trim()
                            );
                          }}
                          name={"last_name"}
                          type={"text"}
                          value={values.last_name.trim()}
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
                            e.target.value.trim()
                          );
                        }}
                        // type={"email"}
                        autoComplete={"off"}
                        fullWidth
                        size={"small"}
                        value={values.email.trim()}
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
                        type={showPassword}
                        autoComplete={"off"}
                        fullWidth
                        size={"small"}
                        name={"password"}
                        value={values.password.trim()}
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
                        onChange={(e) => {
                          handleChangeValues(
                            setFieldValue,
                            "phone_number",
                            e.target.value.trim()
                          );
                        }}
                        name={"phone_number"}
                        type={"number"}
                        autoComplete={"off"}
                        fullWidth
                        value={values.phone_number.trim()}
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
                    <Box className={styles.account_type}>      
                    <Box className={styles.label}>Account Type  
                    </Box>
                    <AccountInfoModal/>
                    </Box>      

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

                     {values.admin == "admin" &&     <Box>
                    <Box className={styles.label}>Aadhaar Number</Box>
                    <Box>
                      <TextField
                        onChange={(e) => {
                          handleChangeValues(
                            setFieldValue,
                            "aadhar",
                            e.target.value.trim()
                          );
                        }}
                        name={"aadhar"}
                        
                        autoComplete={"off"}
                        fullWidth
                        value={values.aadhar}
                        size={"small"}
                        placeholder={"Enter Aadhaar Number"}
                      />
                      <Box className={styles.errorText}>
                        {errors.aadhar &&
                          touched.aadhar &&
                          errors.aadhar + "*"}
                      </Box>
                    </Box>
                  </Box>}     
                

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
                  <Box className={styles.centerAlign}>OR</Box>
                  <Box marginBottom={"15px"}><LoginButton/></Box> 
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
      <Box className={styles.parallel}>
        {" "}
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
    </>
  );
}

export default Register;
