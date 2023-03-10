import React, { useState } from "react";
import { Box, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import styles from "../Authentication.module.css";
import { logo_image } from "../../../assets/assets";
import {AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai";

function Register() {

  const [showPassword,setShowPassword] = useState("password");
  const handleShowPassword = () =>{
    showPassword == "password" && setShowPassword("text");
    showPassword == "text" && setShowPassword("password");
  }

  return (
    <Box className={styles.main}>
      <Box className={styles.auth_left}>
        <img src={logo_image} className={styles.logo_image} />
      </Box>
      <Box className={styles.auth_right}>
        <Box className={styles.input_box}>
          <Box className={styles.name_container}>
            <Box>
              <Box className={styles.label}>First Name</Box>
              <Box>
                <TextField
                type={"text"}
                  autoComplete={"off"}
                  size={"small"}
                  placeholder="First Name"
                />
              </Box>
            </Box>
            <Box>
              <Box className={styles.label}>Last Name</Box>
              <Box>
                <TextField
                  type={"text"}
                  autoComplete={"off"}
                  size={"small"}
                  placeholder="Last Name"
                />
              </Box>
            </Box>
          </Box>

          <Box>
            <Box className={styles.label}>Email</Box>
            <Box>
              <TextField
                type={"email"}
                autoComplete={"off"}
                fullWidth
                size={"small"}
                placeholder={"Enter Email"}
              />
            </Box>
          </Box>

          <Box>
            <Box className={styles.label}>Password</Box>
            <Box>
              <TextField
                type={showPassword}
                autoComplete={"off"}
                fullWidth
                size={"small"}
                placeholder={"Enter Password"}
                InputProps={{ // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                      >
                        {showPassword == "password" ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Box>

          <Box>
            <Box className={styles.label}>Phone Number</Box>
            <Box>
              <TextField
                type={"number"}
                autoComplete={"off"}
                fullWidth
                size={"small"}
                placeholder={"Enter Phone Number"}
              />
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
      </Box>
    </Box>
  );
}

export default Register;
