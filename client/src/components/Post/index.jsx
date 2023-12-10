import React from 'react'
import { Box, Typography } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Carousel from '../Carousel';
import DefaultUser from "../../assets/images/default-user.png"
import Image2 from "../../assets/images/image2.jpg"
import Image3 from "../../assets/images/image3.jpg"
import Image4 from "../../assets/images/image4.jpg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { useDispatch, useSelector } from "react-redux"
import { openUserDialog } from '../../store/redux/reducers/appReducer';
import { useState } from 'react';
import { useEffect } from 'react';
import { likePostReady } from '../../store/redux/reducers/postReducer';
import userReducer from '../../store/redux/reducers/userReducer';
import ImageRoot from '../ImageRoot';


const Post = ({ author, content, title, imageUrls, likedBy, comments, createdAt, id }) => {
  const dispatch = useDispatch();
  const handleOpenListUserDialog = () => {
    dispatch(openUserDialog());
  }
  const { user } = useSelector(state => state.userReducer)
  const [isLiked, setIsLiked] = useState(likedBy[0]?.id === user?.id);
  const [countLike, setCountLike] = useState(likedBy?.length);
  const handleLikedPost = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setCountLike(prevState => prevState + 1)
    }
    else {
      setCountLike(prevState => prevState - 1)
    }
    dispatch(likePostReady({ id }))
  }

  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    // Assuming createdAt is a valid timestamp string
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();

    const timeDifference = currentDate - createdAtDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeElapsedString = '';

    if (days > 0) {
      timeElapsedString = `${days} ngày `;
    }

    else if (hours > 0) {
      timeElapsedString = `${hours % 24} giờ `;
    }

    else if (minutes > 0) {
      timeElapsedString = `${minutes % 60} phút `;
    }

    else if (seconds > 0) {
      timeElapsedString = `${seconds % 60} giây`;
    }

    setTimeElapsed(timeElapsedString.trim());
  }, [createdAt]);


  return (
    <Box className="post-item" sx={{ display: "flex", minHeight: "100px", width: "100%", padding: "12px 0px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "10%" }}>
        <Box component={"img"} src={author?.avatarUrl ? author?.avatarUrl : DefaultUser} sx={{ width: "36px", height: "36px", borderRadius: "50%", marginBottom: "12px", objectFit: "cover" }}></Box>
        <Box sx={{ backgroundColor: "rgba(0,0,0,0.1)", width: "1px", height: "80%" }}></Box>
      </Box>
      <Box sx={{ width: "90%" }}>
        <Box sx={{ height: "21px", display: "flex", alignItems: "center", justifyContent: 'space-between', width: "100%", marginTop: "4px" }}>
          <Typography sx={{ fontSize: "15px", lineHeight: "21px", fontWeight: "600" }}>{author?.fullName ? author?.fullName : "author"}</Typography>
          <Box sx={{ display: 'flex', alignItems: "center" }}>
            <Typography sx={{ color: "#999", fontSize: "15px", fontWeight: "300", marginRight: "12px" }}>{createdAt ? timeElapsed : "Không xác định"}</Typography>
            <MoreHorizIcon sx={{ color: "black", fontSize: "14px" }} />
          </Box>
        </Box>
        <Box sx={{ padding: "6px 0px" }}>
          <Typography variant='body1' sx={{ fontSize: "15px", lineHeight: "21px", fontWeight: "400" }}>
            {
              content
            }
          </Typography>
        </Box>
        <Box sx={{ margin: "12px 0px" }}>
          {
            imageUrls?.length > 2 ? <Carousel listImage={imageUrls} /> : <Box>
              {
                imageUrls?.map((e, i) => {
                  return (
                    <ImageRoot key={i} component={"img"} image={e} sx={{ maxWidth: "40%" }}></ImageRoot>
                  )
                })
              }
            </Box>
          }
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "16px", marginTop: "20px" }}>
          {

            isLiked ? <FavoriteIcon onClick={handleLikedPost} sx={{ fontSize: "22px", cursor: "pointer", color: "#fe3040" }} /> : <FavoriteBorderIcon onClick={handleLikedPost} sx={{ fontSize: "22px", cursor: "pointer" }} />
          }
          <ModeCommentOutlinedIcon sx={{ fontSize: "22px", cursor: "pointer" }} />
          <AutorenewOutlinedIcon sx={{ fontSize: "22px", cursor: "pointer" }} />
          <IosShareOutlinedIcon sx={{ fontSize: "22px", cursor: "pointer" }} />
        </Box>
        <Box sx={{ margin: "12px 0px", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "16px" }}>
          <Typography onClick={handleOpenListUserDialog} sx={{
            fontSize: "15px", fontWeight: "400", color: "#999", cursor: "pointer", ":hover": {
              textDecoration: "underline"
            }
          }}>{countLike} lượt thích</Typography>
          <Typography sx={{ fontSize: "15px", fontWeight: "400", color: "#999" }}>{comments?.length} bình luận</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Post