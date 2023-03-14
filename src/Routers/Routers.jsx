import React, { useEffect } from 'react';
import {Routes,Route, useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import Login from '../Screens/Authentication/Login/Login';
import Register from '../Screens/Authentication/Signup/Register';
import ForgotPassword from '../Screens/Authentication/ForgotPassword/ForgotPassword';
import { Dashboard } from '../Screens/Dashboard/Dashboard';

function Routers() {
  const navigate = useNavigate();
  const authChecker = ()=>{
    const token = localStorage.getItem("token");
    if(token){
      navigate("/");
    }else{
      navigate("/login");
    }
  }

  useEffect(()=>{
    authChecker();
  },[])

  return (
    <Box>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        </Routes>
    </Box>
  )
}

export default Routers