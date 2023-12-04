import React from 'react'
import { Box } from "@mui/material"
import Logo from "../../assets/images/logo.png"
import Grid from '@mui/material/Unstable_Grid2';
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

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return (
        <Grid container spacing={3} className="header" sx={{ padding: "12px 120px", display: "flex", alignItems: "center" }}>
            <Grid xs>
                <Box component={"img"} src={Logo} sx={{ width: "50%", height: "auto" }}></Box>
            </Grid>
            <Grid xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
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
                <Box sx={{ padding: "16px 28px", transition: ".3s ease", borderRadius: "8px", cursor: "pointer", ":hover": { backgroundColor: "#f2f2f2" } }}>
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
            <Grid xs sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Box>
                    <SegmentOutlinedIcon sx={{ fontSize: "32px", color: "#999" }} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Header