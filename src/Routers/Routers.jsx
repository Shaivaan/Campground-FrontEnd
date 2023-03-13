import React from 'react';
import {Routes,Route} from "react-router-dom";
import {Box} from "@mui/material";
import Login from '../Screens/Authentication/Login/Login';
import Register from '../Screens/Authentication/Signup/Register';
import ForgotPassword from '../Screens/Authentication/ForgotPassword/ForgotPassword';

function Routers() {
  return (
    <Box>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        </Routes>
    </Box>
  )
}

export default Routers