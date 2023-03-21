import React, { useEffect } from 'react';
import {Routes,Route, useNavigate, useLocation} from "react-router-dom";
import {Box} from "@mui/material";
import Login from '../Screens/Authentication/Login/Login';
import Register from '../Screens/Authentication/Signup/Register';
import ForgotPassword from '../Screens/Authentication/ForgotPassword/ForgotPassword';
import  Dashboard  from '../Components/NavbarAndSidebar/Template';
import { Profile } from '../Screens/Profile/Profile';
import AddCampground from '../Screens/AddCampground/AddCampground';
import MyCampground from '../Screens/MyCampground/MyCampground.web';

function Routers() {
  const navigate = useNavigate();
  const location = useLocation();
  const authChecker = ()=>{
    const token = localStorage.getItem("token");
    const auth = ["/login","/register","/forgotpassword"];
    token && auth.includes(location.pathname) && navigate("/profile");
    !token && !auth.includes(location.pathname) && navigate("/login");
  }

  const navigator = ()=>{

  }

  useEffect(()=>{
    authChecker();
  },[location.pathname])

  return (
    <Box>
        <Routes>
            <Route path='/' element={<Dashboard element={<Profile/>}/>}/>
            <Route path='/profile' element={<Dashboard element={<Profile/>}/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/addcampground' element={<Dashboard element={<AddCampground/>}/>}/>
            <Route path='/myCampground' element={<Dashboard element={<MyCampground/>}/>}/>
        </Routes>
    </Box>
  )
}

export default Routers