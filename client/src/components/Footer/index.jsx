import React from 'react'
import { Box, Typography } from "@mui/material"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: "center" , gap:"24px", padding:"12px 0px"}}>
            <Typography sx={{ fontSize: '12px', color: "#999" }}>© 2023</Typography>
            <Link to="#" style={{ fontSize: '12px', color: "#999" }}>Điều khoản của Connectify</Link>
            <Link to="#" style={{ fontSize: '12px', color: "#999" }}>Chính sách quyền riêng tư</Link>
            <Link to="#" style={{ fontSize: '12px', color: "#999" }}>Chính sách cookie</Link>
            <Link to="#" style={{ fontSize: '12px', color: "#999" }}>Báo cáo sự cố</Link>
        </Box>
    )
}

export default Footer