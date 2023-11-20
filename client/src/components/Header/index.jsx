import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Avatar, IconButton } from "@material-ui/core";
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FeedbackIcon from '@material-ui/icons/Feedback';
import './index.css'
import LogoHomePage from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import Image6 from '../../assets/images/image6.jpeg';


const Header = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    return (
        <div className="header">
            <div className="header__left">
                <Link className="header__left-logo" to="/">
                    <img src={LogoHomePage} alt='Logo' />
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
                    <input placeholder='Search in connectify' type='text' />
                </div>
            </div>
            <div className="header__right" style={{ position: "relative" }}>
                <div className='header__info'>
                    {/* <Avatar src={user.photoURL} /> */}
                    {/* <h4>{user.displayName}</h4> */}
                </div>
                <div className='header__info'>
                    <ForumIcon />
                </div>
                <div className='header__info'>
                    <NotificationsActiveIcon />
                </div>
                <IconButton onClick={() => setOpenDropdown(!openDropdown)} disableRipple disableTouchRipple >
                    <Avatar src={Image6} />
                </IconButton>
                {
                    openDropdown ? <div style={{ width: "260px", height: "max-content", position: "absolute", background: "white", top: "54px", right: "0", display: 'flex', flexDirection: "column", alignItems: 'center', padding: "20px", borderRadius: "8px", boxShadow: "0px 5px 7px -7px rgba(0, 0,0, 0.75)", border: "solid 1px rgba(0,0,0,0.12)" }}>
                        <div className='avatar mb-4 mt-2'>
                            <Avatar src={Image6} />
                        </div>
                        <h4 className='name mb-3'>Quốc Khánh</h4>
                        <div className='mt-2 mb-2' style={{ display: "block", width: "100%", height: "1px", background: "rgba(0, 0,0, 0.12)" }}></div>
                        <div style={{ width: "100%" }}>
                            <div className='menu-item' style={{ padding: "12px", borderRadius: "8px", cursor: "pointer  ", display: "flex", alignItems: "center" }}>
                                <AssignmentIndIcon className='me-2' />
                                User Info
                            </div>
                            <div className='menu-item' style={{ padding: "12px", borderRadius: "8px", cursor: "pointer  ", display: "flex", alignItems: "center" }}>
                                <SettingsIcon className='me-2' />
                                Setting
                            </div>
                            <div className='menu-item' style={{ padding: "12px", borderRadius: "8px", cursor: "pointer  ", display: "flex", alignItems: "center" }}>
                                <FeedbackIcon className='me-2' />Feedback
                            </div>
                        </div>
                        <div className='mt-2 mb-2' style={{ display: "block", width: "100%", height: "1px", background: "rgba(0, 0,0, 0.12)" }}></div>
                        <div style={{ width: "100%" }}>
                            <div className='menu-item' style={{ padding: "12px", borderRadius: "8px", cursor: "pointer  ", display: "flex", alignItems: "center" }}>
                                <MeetingRoomIcon className='me-2' />
                                Log out
                            </div>
                        </div>
                    </div> : <></>
                }
            </div>
        </div>
    )
}

export default Header