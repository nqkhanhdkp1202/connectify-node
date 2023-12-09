import React from 'react'
import { Box, Typography } from '@mui/material'
import DefaultUser from '../../assets/images/default-user.png'
import ButtonRoot from '../ButtonRoot'

const ListUser = ({ listData }) => {
    const User = ({ avatar, username, fullname }) => {
        return (<Box sx={{ display: "flex", padding: "12px 0px" }}>
            <Box component={"img"} src={avatar ? avatar : DefaultUser} sx={{ width: "36px", height: "36px", borderRadius: "50%", outline: "1px solid rgba(0,0,0,0.1)", cursor: "pointer", marginRight: "12px",objectFit:"cover"  }}></Box>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Box sx={{ display: "flex", border: "1px solid rbga(0,0,0,0.1)", justifyContent: "space-between", width: "100%" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", width: "400%" }}>
                        <Typography sx={{ cursor: "pointer", fontSize: "15px", fontWeight: "600", lineHeight: "21px" }}>{fullname ? fullname : "quốc khánh"}</Typography>
                        <Typography sx={{ fontSize: "15px", fontWeight: "400", lineHeight: "21px", color: "#999" }}>{username ? username : "quốc khánh"}</Typography>
                    </Box>
                    <ButtonRoot style={{ fontSize: "12px !important", padding: "0px 16px !important", fontWeight: "600", border: "1px solid rgba(0,0,0,0.1)", textTransform: "unset", lineHeight: "0px !important", fontWeight: "600", borderRadius: "16px" }} bgColor='white' textColor='black' text={"Thêm bạn"}></ButtonRoot>
                </Box>
                <Typography sx={{marginTop:"12px", fontSize:"14px", color:"rgba(0,0,0,0.2)", minHeight:"12px"}}>Người có thể bạn sẽ biết ...</Typography>
                <hr style={{color:"rgba(0,0,0,0.15)"}}/>
            </Box>
        </Box>)
    }

    return (
        <Box>
            {
                listData && listData?.map((e, i) => (
                    <User key={i} avatar={e?.avatar} username={e?.username || "Quốc Khánh"} fullname={e?.fullname || "Quốc Khánh"} />
                ))
            }
        </Box>
    )
}

export default ListUser