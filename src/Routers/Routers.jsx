import React, { useEffect } from 'react';
import {Routes,Route, useNavigate, useLocation} from "react-router-dom";
import {Box} from "@mui/material";
import Login from '../Screens/Authentication/Login/Login';
import Register from '../Screens/Authentication/Signup/Register';
import ForgotPassword from '../Screens/Authentication/ForgotPassword/ForgotPassword';
import  Dashboard  from '../Components/NavbarAndSidebar/Template';
import { Profile } from '../Screens/Profile/Profile';
import AddCampground from '../Screens/Admin/AddCampground/AddCampground';
import MyCampground from '../Screens/Admin/MyCampground/MyCampground.web';
import EditCampground from '../Screens/Admin/EditCampground/EditCampground';
import { useDispatch } from 'react-redux';
import { addNavData } from '../Redux/action';
import LandingPage from '../Screens/LandingPage/LandingPage';
import ExploreCamps from '../Screens/User/ExploreCamps/ExploreCamps';
import SeeCampground from '../Screens/User/SeeCampground/SeeCampground';

function Routers() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authChecker = ()=>{
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    if(location.pathname == "/"){
      console.log(isAdmin);
      token && isAdmin && navigate("/profile");
      token && !isAdmin && navigate("/profile");
    }

    // const auth = ["/login","/register","/forgotpassword"];
    // token && auth.includes(location.pathname) && navigate("/profile");
    // !token && !auth.includes(location.pathname) && navigate("/login");
  }

const headset=()=>{
  console.log(location.pathname)
  location.pathname == "/addcampground"  && dispatch(addNavData("Add a Campground"))
  location.pathname == "/"  && dispatch(addNavData("Camping Cubs"))
  location.pathname == "/profile" && dispatch(addNavData("Profile"))
  location.pathname == "/myCampground" && dispatch(addNavData("My Campgrounds"))
  location.pathname == "/user/explore" && dispatch(addNavData("Explore Campgrounds"))
}

  useEffect(()=>{
    authChecker();
    headset();
  },[location.pathname])

  return (
    <Box>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/profile' element={<Dashboard element={<Profile/>}/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/addcampground' element={<Dashboard element={<AddCampground/>}/>}/>
            <Route path='/myCampground' element={<Dashboard element={<MyCampground/>}/>}/>
            <Route path='/editCampground' element={<Dashboard element={<EditCampground/>}/>}/>
            <Route path='/user/explore' element={<Dashboard element={<ExploreCamps/>}/>}/>
            <Route path='/user/seeCampground' element={<Dashboard element={<SeeCampground/>}/>}/>
        </Routes>
    </Box>
  )
}

export default Routers