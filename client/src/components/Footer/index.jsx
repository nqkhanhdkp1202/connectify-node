import React from 'react'
import { Box, Typography } from "@mui/material"
import { Link } from 'react-router-dom'
import useWindowDimensions from '../../utils/useWindowDimensions'

const Footer = () => {
    const { width } = useWindowDimensions();
    return (
        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: "center", gap: width < 576 ? "8px" : "24px", padding: "12px 0px" }}>
            {
                width < 576 ? <></> :
                    <Typography sx={{ fontSize: width < 576 ? "8px" : '12px', color: "#999" }}>© 2023</Typography>

            }
            <Link to="#" style={{ fontSize: width < 576 ? "8px" : '12px', color: "#999" }}>Điều khoản của Connectify</Link>
            <Link to="#" style={{ fontSize: width < 576 ? "8px" : '12px', color: "#999" }}>Chính sách quyền riêng tư</Link>
            <Link to="#" style={{ fontSize: width < 576 ? "8px" : '12px', color: "#999" }}>Chính sách cookie</Link>
            <Link to="#" style={{ fontSize: width < 576 ? "8px" : '12px', color: "#999" }}>Báo cáo sự cố</Link>
        </Box>
    )
}

export default Footer