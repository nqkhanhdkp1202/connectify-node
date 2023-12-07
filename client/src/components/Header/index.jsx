import React, { useState } from 'react'
import { Box, Grid } from "@mui/material"
import Logo from "../../assets/images/logo.png"
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import CottageIcon from '@mui/icons-material/Cottage';
import SearchIcon from '@mui/icons-material/Search';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useLocation, useNavigate } from "react-router-dom"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import {useDispatch}  from "react-redux"
import { openCreateDialog } from '../../store/redux/reducers/appReducer';

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const openDropdown = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const StyledMenu = styled((props) => (
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          {...props}
        />
      ))(({ theme }) => ({
        '& .MuiPaper-root': {
          borderRadius: 8,
          marginTop: theme.spacing(1),
          padding: "8px 0",
          minWidth: 140,
          color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
          boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          '& .MuiMenu-list': {
            padding: '0px 0',
          },
          '& .MuiMenuItem-root': {
            padding:"8px 16px",
            '& .MuiSvgIcon-root': {
              fontSize: 15,
              marginRight: theme.spacing(1.5),
            },
          },
        },
      }));

      const dispatch = useDispatch();

      const handleOpenDialog = () => {
        dispatch(openCreateDialog());
      }

    return (
        <Grid container spacing={3} className="header" sx={{ height: "80px", padding: "12px 240px", display: "flex", alignItems: "center", position: "fixed", top: 0, left: 0, right: 0, backgroundColor: "rgba(255,255,255,0.9)", zIndex: 900 }}>
            <Grid xs sx={{ padding: "0px" }}>
                <Box component={"img"} src={Logo} sx={{ width: "50%", height: "auto" }}></Box>
            </Grid>
            <Grid xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "0px" }}>
                <Box onClick={() => navigate("/")} sx={{ padding: "16px 28px", transition: ".3s ease", borderRadius: "8px", cursor: "pointer", ":hover": { backgroundColor: "#f2f2f2" } }}>
                    {
                        pathname === "/" ? <CottageIcon sx={{ fontSize: "32px", color: "black" }} /> : <CottageOutlinedIcon sx={{ fontSize: "32px", color: "#999" }} />
                    }
                </Box >
                <Box onClick={() => navigate("/search")} sx={{ padding: "16px 28px", transition: ".3s ease", borderRadius: "8px", cursor: "pointer", ":hover": { backgroundColor: "#f2f2f2" } }}>
                    {
                        pathname.includes("/search") ? <SearchIcon sx={{ fontSize: "32px", color: "black" }} /> : <SearchIcon sx={{ fontSize: "32px", color: "#999" }} />
                    }
                </Box>
                <Box onClick={handleOpenDialog} sx={{ padding: "16px 28px", transition: ".3s ease", borderRadius: "8px", cursor: "pointer", ":hover": { backgroundColor: "#f2f2f2" } }}>
                    <EditNoteIcon sx={{ fontSize: "32px", color: "#999" }} />
                </Box>
                <Box onClick={() => navigate("/activity")} sx={{ padding: "16px 28px", transition: ".3s ease", borderRadius: "8px", cursor: "pointer", ":hover": { backgroundColor: "#f2f2f2" } }}>
                    {
                        pathname.includes("/activity") ? <NotificationsActiveIcon sx={{ fontSize: "32px", color: "black" }} /> : <NotificationsActiveOutlinedIcon sx={{ fontSize: "32px", color: "#999" }} />
                    }
                </Box>
                <Box onClick={() => navigate("/profile")} sx={{ padding: "16px 28px", transition: ".3s ease", borderRadius: "8px", cursor: "pointer", ":hover": { backgroundColor: "#f2f2f2" } }}>
                    {
                        pathname.includes("/profile") ? <PersonIcon sx={{ fontSize: "32px", color: "black" }} /> : <PersonOutlineOutlinedIcon sx={{ fontSize: "32px", color: "#999" }} />
                    }

                </Box>
            </Grid>
            <Grid xs sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0px" }}>
                <Box sx={{ position: "relative" }}>
                    <Box onClick={handleClick} aria-controls={openDropdown ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openDropdown ? 'true' : undefined}>
                        <SegmentOutlinedIcon sx={{ fontSize: "32px", color: "#999", cursor: "pointer", transition: ".3s ease", ":hover": { color: "black" }, color: openDropdown ? "black" : "#999" }} />
                    </Box>
                        <StyledMenu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            open={openDropdown}
                            onClose={handleClose}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              sx={{padding:"20px"}}
                        >
                            <MenuItem onClick={handleClose}>Trang cá nhân</MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem onClick={handleClose}>Báo cáo sự cố</MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
                        </StyledMenu>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Header