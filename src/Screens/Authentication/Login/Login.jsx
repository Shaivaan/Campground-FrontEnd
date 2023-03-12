import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import styles from "../Authentication.module.css";
import { logo_image } from "../../../assets/assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login_validation_schema } from "../../../assets/formAssets/validationSchema";
import { login_initial_values } from "../../../assets/formAssets/initialValues";
import { Formik } from "formik";
import {FcGoogle} from "react-icons/fc";
import { Link } from "react-router-dom";


function Login() {
  const [showPassword, setShowPassword] = useState("password");
  const handleShowPassword = () => {
    showPassword == "password" && setShowPassword("text");
    showPassword == "text" && setShowPassword("password");
  };

  return (
    <Box className={styles.main}>
      <Box className={styles.auth_left}>
        <img src={logo_image} className={styles.logo_image} />
      </Box>
      <Box className={styles.auth_right}>
        <Formik
          initialValues={login_initial_values}
          onSubmit={(values) => {
            values.full_name = values.first_name + " " + values.last_name;
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
                    <Box className={styles.errorText}>
                      {errors.password &&
                        touched.password &&
                        errors.password + "*"}
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
                <Button  variant={"outlined"} fullWidth><FcGoogle className={styles.googleIcon}/>Login With Google</Button>
                <Box className={styles.centerAlign}>Need an account? <Link to={"/register"}>Register</Link></Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default Login;
