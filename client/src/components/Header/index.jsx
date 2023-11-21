import { Avatar, IconButton } from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import FeedbackIcon from "@material-ui/icons/Feedback";
import ForumIcon from "@material-ui/icons/Forum";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultUser from "../../assets/images/default-user.png";
import LogoHomePage from "../../assets/images/logo.png";
import { useAuth } from "../../store/AuthContext";
import { useDialog } from "../../store/DialogContext";
import "./index.css";

const Header = () => {
  const { token, userInfo, logout } = useAuth();
  const { updateDialog, openDialog, closeDialog } = useDialog();

  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    toast.success("You have been successfully logged out!");
    navigate("/login");
  }

  return (
    <div className="header">
      <div className="header__left">
        <Link className="header__left-logo" to="/">
          <img src={LogoHomePage} alt="Logo" />
        </Link>
      </div>

      <div className="header__middle">
        {/* <div className='header__option header__option--active'>
                    <HomeIcon fontSize='large' />
                </div>
                <div className='header__option'>
                    <FlagIcon fontSize='large' />
                </div>
                <div className='header__option'>
                    <SubscriptionsOutlinedIcon fontSize='large' />
                </div>
                <div className='header__option'>
                    <StorefrontOutlinedIcon fontSize='large' />
                </div>
                <div className='header__option'>
                    <SupervisedUserCircleIcon fontSize='large' />
                </div> */}
        <div className="header__input">
          <SearchIcon />
          <input placeholder="Search in connectify" type="text" />
        </div>
      </div>
      <div className="header__right" style={{ position: "relative" }}>
        <div className="header__info">
          {/* <Avatar src={user.photoURL} /> */}
          {/* <h4>{user.displayName}</h4> */}
        </div>
        <div className="header__info">
          <ForumIcon />
        </div>
        <div className="header__info">
          <NotificationsActiveIcon />
        </div>
        <IconButton
          onClick={() => setOpenDropdown(!openDropdown)}
          disableRipple
          disableTouchRipple
        >
          <Avatar src={DefaultUser} style={{ border: "2px solid #55a138" }} />
        </IconButton>
        {openDropdown ? (
          <div
            style={{
              width: "260px",
              height: "max-content",
              position: "absolute",
              background: "white",
              top: "54px",
              right: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 5px 7px -7px rgba(0, 0,0, 0.75)",
              border: "solid 1px rgba(0,0,0,0.12)",
            }}
          >
            <div className="avatar mb-4 mt-2">
              <Avatar src={DefaultUser} />
            </div>
            <h4 className="name mb-3">{userInfo?.fullName}</h4>
            <div
              className="mt-2 mb-2"
              style={{
                display: "block",
                width: "100%",
                height: "1px",
                background: "rgba(0, 0,0, 0.12)",
              }}
            ></div>
            <div style={{ width: "100%" }}>
              <div
                className="menu-item"
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer  ",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  setOpenDropdown(false);
                  openDialog();
                }}
              >
                <AssignmentIndIcon className="me-2" />
                User Info
              </div>
              <div
                className="menu-item"
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer  ",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SettingsIcon className="me-2" />
                Setting
              </div>
              <div
                className="menu-item"
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer  ",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FeedbackIcon className="me-2" />
                Feedback
              </div>
            </div>
            <div
              className="mt-2 mb-2"
              style={{
                display: "block",
                width: "100%",
                height: "1px",
                background: "rgba(0, 0,0, 0.12)",
              }}
            ></div>
            <div style={{ width: "100%" }}>
              <div
                onClick={handleLogout}
                className="menu-item"
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer  ",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <MeetingRoomIcon className="me-2" />
                Log out
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Header;
