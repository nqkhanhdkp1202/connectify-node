import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import DefaultUser from "../../assets/images/default-user.png"
import ButtonRoot from '../../components/ButtonRoot'
import { useDispatch } from "react-redux"
import { openEditDialog, openUserDialog } from '../../store/redux/reducers/appReducer'
import Post from '../../components/Post'
import { getUserInfoReady } from '../../store/redux/reducers/userReducer'
import {useSelector} from "react-redux"
import ListPost from '../../components/ListPost'
import { getListPostReady } from '../../store/redux/reducers/postReducer'
import { useState } from 'react';

const Profile = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);
  const {listPost} = useSelector(state => state.postReducer);
  const [infoUser, setInfoUser] = useState({});
  const handleOpenListUserDialog = () => {
    dispatch(openUserDialog());
  }

  const handleOpenEditDialog = () => {
    dispatch(openEditDialog());
  }

  useEffect(() => {
    dispatch(getUserInfoReady());
    dispatch(getListPostReady());
  }, [dispatch])

  const filterListPost = listPost?.filter((e) => e?.author?.id === infoUser?.id)

  useEffect(() => {
    if(user){
      setInfoUser(user);
    }
  },[user])

  return (
    <Box sx={{ padding: "16px 0", minHeight:"82vh" }}>
      <Box className="profile">
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Typography sx={{ fontSize: "24px", fontWeight: "700", lineHeight: "30px", color: "black" }}>{infoUser?.fullName}</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: "300", lineHeight: "21px", color: "#999", marginTop: "4px" }}>{infoUser?.email} / {infoUser?.address ? infoUser?.address : "Address"}</Typography>
            </Box>
            <Box component={"img"} src={infoUser?.avatarUrl ? infoUser?.avatarUrl : DefaultUser} sx={{ width: "84px", height: "84px", borderRadius: "50%", objectFit: "cover" }}></Box>
          </Box>
          <Box sx={{ marginTop: "12px" }}>
            <Typography>{infoUser?.bio}</Typography>
          </Box>
          <Box sx={{ marginTop: "24px", display: "flex", alignItems: 'center' }}>
            <Box sx={{ position: "relative", width: infoUser?.friends?.length > 1 ? "56px" : infoUser?.friends?.length > 0 ? "32px" : "6px", height: "fit-content" }}>
              {
                infoUser?.friends?.slice(0, 3).map((e, i) => (
                  <Box key={i} component={"img"} src={e?.avatarUrl ? e?.avatarUrl : DefaultUser} sx={{ width: "22px", height: "22px", borderRadius: "50%", border: "2px solid white", position: "absolute", left: `${i * 14}px`, top: "50%", transform: "translateY(-50%)", objectFit: "cover" }} />
                ))
              }
            </Box>
            <Typography onClick={handleOpenListUserDialog} sx={{ fontSize: "15px", fontWeight: "300", color: "#999", cursor: "pointer", ":hover": { textDecoration: "underline" } }}>{infoUser?.friends?.length} người bạn</Typography>
          </Box>
        </Box>
      </Box>
      <Box className="profile-edit" sx={{ height: "58px", padding: "12px 0", marginTop: "16px" }}>
        <ButtonRoot onClick={handleOpenEditDialog} text={"Chỉnh sửa trang cá nhân"} style={{ height: "100%", fontSize: "15px", textTransform: "unset", padding: "0px", border: "1px solid rgba(0,0,0,0.15)", borderRadius: "10px" }} textColor='black' bgColor='white'></ButtonRoot>
      </Box>
      <Box className="list=post" sx={{ display: "flex", flexDirection: "column", marginTop: "24px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: "800", marginRight: "16px" }}>Danh sách bài viết</Typography>
          <hr style={{ width: "70%", height: "2px", backgroundColor: "rgba(0,0,0,0.15)" }} />
        </Box>
        <Box>
          <ListPost listPost={filterListPost} />
        </Box>
      </Box>
    </Box>
  )
}

export default Profile