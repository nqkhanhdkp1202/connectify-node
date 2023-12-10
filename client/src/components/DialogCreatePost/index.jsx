import React from 'react'
import { createPortal } from 'react-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography, InputBase } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { closeCreateDialog, closeLoadDialog, openLoadDialog } from '../../store/redux/reducers/appReducer';
import useWindowDimensions from '../../utils/useWindowDimensions';
import ButtonRoot from '../ButtonRoot/index';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { createPostReady } from '../../store/redux/reducers/postReducer';
import { ref } from 'firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { getDownloadURL } from 'firebase/storage';
import { storage } from '../../store/firebase/firebase';
import Carousel from '../Carousel/index';
import ImageRoot from '../ImageRoot/index';
import DefaultUser from "../../assets/images/default-user.png"

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
    const [percent, setPercent] = useState(0);

    const handleClose = () => {
        dispatch(closeCreateDialog());
        setPreview(null);
        setImage(null);
        setContent(null);
    };
    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleChangeFile = (e) => {
        const selectedFiles = e.target.files;
        if (selectedFiles.length > 0) {
            // Check each file's size
            for (const file of selectedFiles) {
                const fileSize = file.size / 1024 / 1024; // in MB

                if (fileSize > 2) {
                    toast.error('File size exceeds 2MB. Please choose smaller files.');
                    setImage(null);
                    return; // Stop processing if any file is too large
                }
            }

            // Set the images array
            const imageArray = Array.from(selectedFiles);
            setImage(imageArray);

            // Read and set the preview for each file
            const promises = imageArray.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(promises).then((results) => {
                setPreview(results);
            });
        }
    };


    const handleSubmit = async () => {
        dispatch(openLoadDialog());
        const submitData = {
            title: "Sample Title",
            content: "",
            imageUrls: [],
        };
        try {
            if (image?.length > 0) {
                image.forEach(element => {
                    const imageRef = ref(storage, `/posts/${element.name}`);
                    const uploadTask = uploadBytesResumable(imageRef, element);

                    uploadTask?.on(
                        "state_changed",
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            setPercent(progress);
                        },
                        (error) => {
                            console.error("Upload Error:", error);
                            toast.error(error.message || "An error occurred during upload");
                        },
                        async () => {
                            try {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                if (downloadURL) {
                                    submitData.imageUrls = [...submitData.imageUrls, downloadURL];
                                }
                            } catch (error) {
                                console.error("Download URL Error:", error);
                                toast.error("Error retrieving download URL");
                                dispatch(closeLoadDialog());
                            }
                        }
                    );
                });
                setTimeout(() => {
                    if (content) {
                        submitData.content = content;
                    }
                    dispatch(createPostReady(submitData));
                }, 3000)
            }
            else {

                if (content) {
                    submitData.content = content;
                }
                dispatch(createPostReady(submitData));
                dispatch(closeLoadDialog());
            }
        } catch (error) {
            console.error("Handle Submit Error:", error);
            toast.error("An error occurred during form submission");
            dispatch(closeLoadDialog());
        }
    };

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
                                <input multiple onChange={handleChangeFile} type="file" style={{ position: "absolute", top: "10px", left: 0, right: 0, opacity: 0 }} /></Box>
                            <TextareaAutosize onChange={handleChangeContent} placeholder='Hãy bắt đầu viết gì đó...' sx={{ marginTop: "16px", width: "100%" }} />
                            <Box sx={{ margin: "12px 0px" }}>
                                {
                                    preview?.length > 2 ? <Carousel listImage={preview} /> : <Box sx={{ display: "flex", alignItems: "center" }}>
                                        {
                                            preview?.map((e, i) => {
                                                return (
                                                    <ImageRoot key={i} image={e} style={{ maxWidth: "30%" }}></ImageRoot>
                                                )
                                            })
                                        }
                                    </Box>}
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