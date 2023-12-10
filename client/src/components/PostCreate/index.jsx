import React from 'react'
import { Box } from "@mui/material"
import DefaultUser from "../../assets/images/default-user.png"
import ButtonRoot from '../ButtonRoot'
import { useDispatch } from "react-redux"
import { openCreateDialog } from '../../store/redux/reducers/appReducer'
import {useSelector} from "react-redux"

const PostCreate = () => {
    const dispatch = useDispatch();
    const handleOpenDialog = (event) => {
        event.preventDefault();
        dispatch(openCreateDialog());
    }
    const {user} = useSelector(state => state.userReducer);
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 12px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
            <Box sx={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden" }}>
                <Box component={"img"} src={user?.avatarUrl ? user?.avatarUrl : DefaultUser} sx={{ width: "100%", height: "100%",objectFit:"cover"  }} />
            </Box>
            <Box sx={{ width: "80%" }}>
                <input onClick={handleOpenDialog} style={{ border: "none", outline: "none", fontSize: "14px", color: "#999" }} placeholder={'Bạn đang nghĩ gì ' +  user?.fullName + ' ...' }/>
            </Box>
            <Box>
                <ButtonRoot style={{ padding: "4px 16px" }} bgColor='#999' textColor='white' text="Đăng" />
            </Box>
        </Box>
    )
}

export default PostCreate