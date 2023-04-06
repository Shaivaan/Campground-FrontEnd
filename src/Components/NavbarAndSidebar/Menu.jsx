import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { GiCampfire } from "react-icons/gi";
import { BsClipboardHeart } from "react-icons/bs";
import {SlCalender} from 'react-icons/sl';
import {MdAccountCircle} from "react-icons/md";
import {RiLogoutBoxRLine} from "react-icons/ri";
import styles from "./Menu.module.css";
import { FaFreeCodeCamp } from "react-icons/fa";

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
                navigate("/user/explore");
              }}
            >
              <ListItemIcon>
                <GiCampfire className={styles.icon}/>
              </ListItemIcon>
              <ListItemText primary="Explore Camps" />
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
                <GiCampfire className={styles.icon}/>
              </ListItemIcon>
              <ListItemText primary="Explore Camps" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/user/wishlist");
              }}
            >
              <ListItemIcon>
                <BsClipboardHeart className={styles.icon}/>
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/user/suggestion");
              }}
            >
              <ListItemIcon>
                <FaFreeCodeCamp className={styles.icon}/>
              </ListItemIcon>
              <ListItemText primary="Suggested Camps" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/user/booking");
              }}
            >
              <ListItemIcon>
                <SlCalender className={styles.icon}/>
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
            <MdAccountCircle className={styles.icon}/>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <RiLogoutBoxRLine className={styles.icon}/>
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
