import React from 'react'
import { Box, Typography } from '@mui/material';
import NoData from "../../assets/images/nodata.jpeg"

const ListEmpty = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", margin:"auto" }}>
            <Box component={"img"} src={NoData} sx={{width:"120px",opacity:"0.2"}}></Box>
            <Typography sx={{fontSize:"16px", color:"#999", marginTop:"12px"}}>{"Hiện tại không có dữ liệu để hiển thị"}</Typography>
        </Box>
    )
}

export default ListEmpty