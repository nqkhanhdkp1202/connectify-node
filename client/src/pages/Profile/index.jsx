import { Box, Typography } from '@mui/material'
import React from 'react'
import Image from "../../assets/images/image1.jpg"
import ButtonRoot from '../../components/ButtonRoot'
import {useDispatch} from "react-redux"
import { openEditDialog, openUserDialog } from '../../store/redux/reducers/appReducer'
import Post from '../../components/Post'

const Profile = () => {
  const profile = {
    name: "Quốc Khánh",
    username: "quockhanh0suy",
    avatar: Image,
    bio: "Hahaahaahah",
    listFriends: [
      {
        name: "Quốc Khánh",
        username: "quockhanh0suy",
        avatar: Image,
        bio: "Hahaahaahah"
      },
      {
        name: "Quốc Khánh",
        username: "quockhanh0suy",
        avatar: Image,
        bio: "Hahaahaahah"
      },
      {
        name: "Quốc Khánh",
        username: "quockhanh0suy",
        avatar: Image,
        bio: "Hahaahaahah",
      },
      {
        name: "Quốc Khánh",
        username: "quockhanh0suy",
        avatar: Image,
        bio: "Hahaahaahah",
      }, {
        name: "Quốc Khánh",
        username: "quockhanh0suy",
        avatar: Image,
        bio: "Hahaahaahah",
      }
    ]
  }
  const dispatch = useDispatch();
  const handleOpenListUserDialog = () => {
    dispatch(openUserDialog());
  }

  const handleOpenEditDialog = () => {
    dispatch(openEditDialog());
  }


  return (
    <Box sx={{ padding: "16px 0" }}>
      <Box className="profile">
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Typography sx={{ fontSize: "24px", fontWeight: "700", lineHeight: "30px", color: "black" }}>{profile.name}</Typography>
              <Typography sx={{ fontSize: "15px", fontWeight: "300", lineHeight: "21px", color: "black", marginTop:"4px" }}>{profile.username}</Typography>
            </Box>
            <Box component={"img"} src={Image} sx={{ width: "84px", height: "84px", borderRadius: "50%", objectFit: "cover" }}></Box>
          </Box>
          <Box sx={{ marginTop: "12px" }}>
            <Typography>{profile?.bio}</Typography>
          </Box>
          <Box sx={{ marginTop: "24px", display: "flex", alignItems: 'center' }}>
            <Box sx={{ position: "relative", width: "56px", height: "fit-content" }}>
              {
                profile?.listFriends?.slice(0, 3).map((e, i) => (
                  <Box component={"img"} src={e.avatar} sx={{ width: "22px", height: "22px", borderRadius: "50%", border: "2px solid white", position: "absolute", left: `${i * 14}px`, top: "50%", transform: "translateY(-50%)" }} />
                ))
              }
            </Box>
            <Typography onClick={handleOpenListUserDialog} sx={{ fontSize: "15px", fontWeight: "300", color: "#999", cursor:"pointer" ,":hover": { textDecoration: "underline" } }}>{profile?.listFriends?.length} người bạn</Typography>
          </Box>
        </Box>
      </Box>
      <Box className="profile-edit" sx={{height:"58px",padding:"12px 0", marginTop:"16px"}}>
        <ButtonRoot onClick={handleOpenEditDialog} text={"Chỉnh sửa trang cá nhân"} style={{height:"100%", fontSize:"15px", textTransform:"unset", padding:"0px", border:"1px solid rgba(0,0,0,0.15)", borderRadius:"10px"}} textColor='black' bgColor='white'></ButtonRoot>
      </Box>
      <Box className="list=post" sx={{display:"flex", flexDirection:"column", marginTop:"24px"}}>
        <Box sx={{display:"flex", alignItems:"center"}}>
          <Typography sx={{fontSize:"16px", fontWeight:"800", marginRight:"16px"}}>Danh sách bài viết</Typography>
          <hr style={{width:"70%", height:"2px", backgroundColor:"rgba(0,0,0,0.15)"}}/>
        </Box>
        <Box>
          <Post />
        </Box>
      </Box>
    </Box>
  )
}

export default Profile