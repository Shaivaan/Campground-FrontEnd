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
import { Formik } from "formik";
import {register_validation_schema} from "../../../assets/formAssets/validationSchema";
import { register_initial_values } from "../../../assets/formAssets/initialValues";
import { Link } from "react-router-dom";

function Register() {
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
          initialValues={register_initial_values}
          onSubmit={values => {
            values.full_name = values.first_name + " " + values.last_name
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
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
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
                      <Box className= {styles.errorText}>
                    {errors.first_name && touched.first_name && errors.first_name + "*"}
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
                      <Box className= {styles.errorText}>
                    {errors.last_name && touched.last_name && errors.last_name + "*"}
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
                    <Box className= {styles.errorText}>
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
                    <Box className= {styles.errorText}>
                    {errors.password && touched.password && errors.password + "*"}
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
                    <Box className= {styles.errorText}>
                    {errors.phone_number && touched.phone_number && errors.phone_number + "*"}
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
              <Box textAlign={"center"}>Already have an account? <Link to={"/login"}>Login</Link></Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default Register;
