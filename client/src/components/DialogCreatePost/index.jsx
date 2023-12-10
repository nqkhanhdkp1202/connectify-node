import React from 'react'
import { createPortal } from 'react-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography, InputBase } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { closeCreateDialog } from '../../store/redux/reducers/appReducer';
import useWindowDimensions from '../../utils/useWindowDimensions';
import ButtonRoot from '../ButtonRoot/index';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { createPostReady } from '../../store/redux/reducers/postReducer';

const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    border-radius: 8px;
    color: black;
    background: '#fff';
    border: 0px solid #999;
    outline: 0;
  
    &:hover {
      border-color:transparent;
    outline: 0;

    }
  
    &:focus {
      border-color: transparent;
    outline: 0;

    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

const DialogCreatePost = ({ children }) => {
    const { isOpenCreateDialog } = useSelector(state => state.appReducer);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const { user } = useSelector(state => state.userReducer);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const handleClose = () => {
        dispatch(closeCreateDialog());
    };
    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleChangeFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Check if file size is greater than 2MB
            const fileSize = selectedFile.size / 1024 / 1024; // in MB
            if (fileSize > 2) {
                toast.error('File size exceeds 2MB. Please choose a smaller file.');
                setImage(null);
            } else {
                setImage(selectedFile);
                // Read the file and set the preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(selectedFile);
            }
        }
    };

    const handleSubmit = () => {
        dispatch(createPostReady({
            title:"This is title",
            content: content,
            imageUrls: [image?.name],
        }))
    }

    return createPortal(
        <React.Fragment>
            <Dialog
                fullScreen={width < 576}
                open={isOpenCreateDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <Box sx={{ width: "600px", padding: "24px" }}>
                    <Box sx={{ minHeight: "100px", display: "flex" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "10%", height: "100%" }}>
                            <Box component={"img"} src={user?.avatarUrl ? user?.avatarUrl : DefaultUser} sx={{ width: "36px", height: "36px", borderRadius: "50%", marginBottom: "12px", objectFit: "cover" }}></Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", marginLeft: "12px" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "700", color: "black" }}>{user?.fullName}</Typography>
                            <Box sx={{ position: "relative", cursor: "pointer" }}>
                                <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "24px", color: "#999", cursor: "pointer", marginTop: "16px" }} />
                                <input onChange={handleChangeFile} type="file" style={{ position: "absolute", top: "10px", left: 0, right: 0, opacity: 0 }} /></Box>
                            <TextareaAutosize onChange={handleChangeContent} placeholder='Hãy bắt đầu viết gì đó...' sx={{ marginTop: "16px", width: "100%" }} />
                            <Box sx={{ margin: "12px 0px" }}>
                                {
                                    image?.length > 2 ? <Carousel listImage={[]} /> : <Box component={"img"} src={preview} sx={{maxWidth:"30%"}}></Box>
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", maxWidth: "100%" }}>
                        <Typography sx={{ fontSize: "14px", color: "#999" }}>Bạn bè của bạn có thể thấy bài viết này</Typography>
                        <Box>
                            <ButtonRoot onClick={handleSubmit} style={{ padding: "4px 16px" }} bgColor='#999' textColor='white' text="Đăng" />
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
        , document.querySelector("#root")
    )
}

export default DialogCreatePost