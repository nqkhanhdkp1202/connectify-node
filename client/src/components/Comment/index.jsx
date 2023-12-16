import React, { useEffect, useState } from 'react'
import { Box, Typography } from "@mui/material"
import DefaultUser from "../../assets/images/default-user.png"
import { useSelector, useDispatch } from "react-redux"
import { commentPostReady } from '../../store/redux/reducers/postReducer'

const Comment = ({ author, createdAt, content, isEdit = false }) => {
  const { user } = useSelector(state => state.userReducer)
  const { idPost } = useSelector(state => state.appReducer)
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleEditComment = (e) => {
    setComment(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent the default form submission
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    dispatch(commentPostReady({ id: idPost, content: comment }))
  };

  return (
    <>
      {
        isEdit ? <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start",padding: "12px", borderBottom: "1px solid rgba(0,0,0,0.1)", marginTop:"12px" }}>
          <Box sx={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden" }}>
            <Box component={"img"} src={user?.avatarUrl ? user?.avatarUrl : DefaultUser} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
          <Box sx={{ width: "78%", marginLeft: "16px" }}>
            <input onChange={handleEditComment} onKeyPress={handleKeyPress} style={{ border: "none", outline: "none", fontSize: "14px", color: "#999", width: "100%" }} placeholder={'Bạn nghĩ gì về bài viết này  ...'} />
          </Box>
        </Box> : <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", marginTop:"24px" }}>
          <Box component={"img"} src={author?.avatarUrl || DefaultUser} sx={{ width: "36px", height: "36px", outline: "1px solid #999", borderRadius: "50%", marginRight: "16px" }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxHeight: "fit-content" }}>
            <Typography sx={{ fontSize: "13px", color: "black", fontWeight: "700", lineHeight: "21px" }}>{author?.fullName}</Typography>
            <Typography sx={{ fontSize: "15px", color: "black", fontWeight: "300", lineHeight: "21px" }}>{content}</Typography>
          </Box>
        </Box>
      }
    </>
  )
}

export default Comment