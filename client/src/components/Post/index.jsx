import React from 'react'
import { Box, Typography } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Carousel from '../Carousel';
import Image1 from "../../assets/images/image1.jpg"
import Image2 from "../../assets/images/image2.jpg"
import Image3 from "../../assets/images/image3.jpg"
import Image4 from "../../assets/images/image4.jpg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import {useDispatch} from "react-redux"
import { openUserDialog } from '../../store/redux/reducers/appReducer';


const Post = ({ author, post }) => {
  const listImage = [Image1, Image2, Image3, Image4]
  const dispatch = useDispatch();
  const handleOpenListUserDialog = () => {
    dispatch(openUserDialog());
  }

  return (
    <Box className="post-item" sx={{ display: "flex", minHeight: "100px", width: "100%", padding: "12px 0px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "10%" }}>
        <Box component={"img"} src={Image1} sx={{ backgroundColor: "red", width: "36px", height: "36px", borderRadius: "50%", marginBottom: "8px",objectFit:"cover"  }}></Box>
        <Box sx={{ backgroundColor: "rgba(0,0,0,0.1)", width: "1px", height: "85%" }}></Box>
      </Box>
      <Box sx={{ width: "90%" }}>
        <Box sx={{ height: "21px", display: "flex", alignItems: "center", justifyContent: 'space-between', width: "100%", marginTop: "4px" }}>
          <Typography sx={{ fontSize: "15px", lineHeight: "21px", fontWeight: "600" }}>{author?.userName ? author?.userName : "author"}</Typography>
          <Box sx={{ display: 'flex', alignItems: "center" }}>
            <Typography sx={{ color: "#999", fontSize: "15px", fontWeight: "300", marginRight: "12px" }}>{post?.createdAt ? post?.createdAt : "13 giờ"}</Typography>
            <MoreHorizIcon sx={{ color: "black", fontSize: "14px" }} />
          </Box>
        </Box>
        <Box sx={{ padding: "6px 0px" }}>
          <Typography variant='body1' sx={{ fontSize: "15px", lineHeight: "21px", fontWeight: "400" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eius modi doloribus vel, deserunt et. Ullam, neque. Blanditiis nobis ex nam vitae eum sequi consequuntur modi unde. Distinctio, iure explicabo.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eius modi doloribus vel, deserunt et. Ullam, neque. Blanditiis nobis ex nam vitae eum sequi consequuntur modi unde. Distinctio, iure explicabo.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eius modi doloribus vel, deserunt et. Ullam, neque. Blanditiis nobis ex nam vitae eum sequi consequuntur modi unde. Distinctio, iure explicabo.
          </Typography>
        </Box>
        <Box sx={{ margin: "12px 0px" }}>
          {
            listImage?.length > 1 ? <Carousel listImage={listImage} /> : <Box component={"img"}></Box>
          }
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "16px", marginTop: "20px" }}>
          <FavoriteBorderIcon sx={{ fontSize: "22px" }} />
          <ModeCommentOutlinedIcon sx={{ fontSize: "22px" }} />
          <AutorenewOutlinedIcon sx={{ fontSize: "22px" }} />
          <IosShareOutlinedIcon sx={{ fontSize: "22px" }} />
        </Box>
        <Box sx={{ margin: "12px 0px", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "16px" }}>
          <Typography onClick={handleOpenListUserDialog} sx={{ fontSize: "15px", fontWeight: "400", color: "#999", cursor:"pointer",":hover":{
            textDecoration:"underline"
          } }}>123 lượt thích</Typography>
          <Typography sx={{ fontSize: "15px", fontWeight: "400", color: "#999" }}>45 bình luận</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Post