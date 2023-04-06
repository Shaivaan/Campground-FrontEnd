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
import Wishlist from '../Screens/User/Wishlist/Wishlist';
import Booking from '../Screens/User/Booking/Booking';
import Suggestion from '../Screens/User/Suggestion/Suggestion';

function Routers() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authChecker = ()=>{
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    if(location.pathname == "/"){
      token && isAdmin == "false" && navigate("/user/explore");
      token && isAdmin == "true" && navigate("/myCampground");
      return
    }

    const auth = ["/login","/register","/forgotpassword"];
    token && auth.includes(location.pathname) && navigate(-1)
    // token && auth.includes(location.pathname) && navigate("/profile");
    // !token && !auth.includes(location.pathname) && navigate("/login");
  }

const headset=()=>{
  location.pathname == "/addcampground"  && dispatch(addNavData("Add a Campground"));
  location.pathname == "/"  && dispatch(addNavData("Camping Cubs"));
  location.pathname == "/profile" && dispatch(addNavData("Profile"));
  location.pathname == "/myCampground" && dispatch(addNavData("My Campgrounds"));
  location.pathname == "/user/explore" && dispatch(addNavData("Explore Campgrounds"));
  location.pathname == "/user/wishlist" && dispatch(addNavData("Wishlist"));
  location.pathname == "/user/booking" && dispatch(addNavData("Your Booking"));
  location.pathname == "/user/suggestion" && dispatch(addNavData("Suggested Campground"));
}



  useEffect(()=>{
    // authChecker();
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
            <Route path='/user/wishlist' element={<Dashboard element={<Wishlist/>}/>}/>
            <Route path='/user/booking' element={<Dashboard element={<Booking/>}/>}/>
            <Route path='/user/suggestion' element={<Dashboard element={<Suggestion/>}/>}/>
        </Routes>
    </Box>
  )
}

export default Routers