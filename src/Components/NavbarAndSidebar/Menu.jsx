import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { GiCampfire } from "react-icons/gi";
import { BsClipboardHeart } from "react-icons/bs";
import {SlCalender} from 'react-icons/sl'

export const MainListItems = () => {
  const navigate = useNavigate();
  const isAdmin = () => {
    if (localStorage.getItem("isAdmin") == "true") {
      return true;
    } else {
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <React.Fragment>
        {isAdmin() && (
          <>
            <ListItemButton
              onClick={() => {
                navigate("/myCampground");
              }}
            >
              <ListItemIcon>
                <WhatshotIcon />
              </ListItemIcon>
              <ListItemText primary="My Campgrounds" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/addcampground");
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Campground" />
            </ListItemButton>{" "}
          </>
        )}

        {!isAdmin() && (
          <>
            <ListItemButton
              onClick={() => {
                navigate("/user/explore");
              }}
            >
              <ListItemIcon>
                <GiCampfire />
              </ListItemIcon>
              <ListItemText primary="Explore Camps" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                <BsClipboardHeart />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                <SlCalender />
              </ListItemIcon>
              <ListItemText primary="Bookings" />
            </ListItemButton>
          </>
        )}

        <ListItemButton
          onClick={() => {
            navigate("/profile");
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>

      </React.Fragment>
    </>
  );
};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
