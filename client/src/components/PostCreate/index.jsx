import React from 'react'
import { Box } from "@mui/material"
import Avatar from "../../assets/images/image1.jpg"
import ButtonRoot from '../ButtonRoot'

const PostCreate = () => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent:"space-between", padding:"12px", borderBottom:"2px solid #f2f2f2"}}>
            <Box sx={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden"}}>
                <Box component={"img"} src={Avatar} sx={{ width: "100%", height: "100%" }} />
            </Box>
            <Box sx={{width:"75%"}}>
                <input style={{border:"none", outline:"none", fontSize:"14px", color:"#999"}} placeholder='Bạn đang nghĩ gì vậy ...'/>
            </Box>
            <Box>
                <ButtonRoot style={{padding:"4px 16px"}} bgColor='#999' textColor='white' text="Đăng" />
            </Box>
        </Box>
    )
}

export default PostCreate