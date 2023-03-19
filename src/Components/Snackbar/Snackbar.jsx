import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

function CustomSnackBar({snackBarVisible,messageType,message}) {

  const [isSnackBarVisible, setSnackBarVisible] = useState(false);
  const TransitionRight = (props) => {
    return <Slide {...props} direction="right" />;
  };

  const handleCloseSnackBar = ()=>{
    setSnackBarVisible(false)
  }

  useEffect(()=>{
    setSnackBarVisible(true);
  },[snackBarVisible])
 
  return (
    <>
    {messageType.trim().length !== 0 &&   <Snackbar
        open={isSnackBarVisible}
        TransitionComponent={TransitionRight}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleCloseSnackBar}
        >
        <Alert
        onClose={handleCloseSnackBar}
        severity={messageType}
          sx={{ width: "100%" }}
          >
          {message}
          </Alert>
        </Snackbar>}
    
    </>
  );
}

export default CustomSnackBar;