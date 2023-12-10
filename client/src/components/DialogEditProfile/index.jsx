import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import { Box, Dialog, Typography, InputBase } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { closeCreateDialog, closeEditDialog } from '../../store/redux/reducers/appReducer';
import useWindowDimensions from '../../utils/useWindowDimensions';
import DefaultUser from '../../assets/images/default-user.png'
import ButtonRoot from '../ButtonRoot';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { storage } from '../../store/firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { toast } from "react-toastify"
import { editProfileReady, getUserInfoReady } from '../../store/redux/reducers/userReducer';
import { useEffect } from 'react';

const DialogEditProfile = ({ children }) => {
    const { isOpenEditDialog } = useSelector(state => state.appReducer);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [percent, setPercent] = useState(0);
    const [preview, setPreview] = useState(null);
    const { user } = useSelector(state => state.userReducer);
    const [fullName, setFullName] = useState(user?.fullName);
    const [bio, setBio] = useState(user?.bio);
    const [address, setAddress] = useState(user?.address);

    useEffect(() => {
        setBio(user?.bio);
        setFullName(user?.fullName);
        setAddress(user?.address)
    }, [user])

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


    const handleClose = () => {
        dispatch(closeEditDialog());
    };

    const handleChangeAddress = (event) => {
        setAddress(event?.target?.value);
    }

    const handleChangeBio = (event) => {
        setBio(event?.target?.value);
    }

    const handleSubmit = async () => {
        const submitData = {};
        try {
            if (image !== null) {
                const imageRef = ref(storage, `/avatar/${image.name}`);
                const uploadTask = uploadBytesResumable(imageRef, image);

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
                            setTimeout(() => {
                                if (fullName) {
                                    submitData.fullName = fullName;
                                }

                                if (bio) {
                                    submitData.bio = bio;
                                }

                                if (address) {
                                    submitData.address = address;
                                }

                                if (downloadURL) {
                                    submitData.avatarUrl = downloadURL;
                                }
                                dispatch(editProfileReady(submitData));
                                setImage(null);
                            }, 2000)
                        } catch (error) {
                            console.error("Download URL Error:", error);
                            toast.error("Error retrieving download URL");
                        }
                    }
                );
            }
            else {
                if (fullName) {
                    submitData.fullName = fullName;
                }

                if (bio) {
                    submitData.bio = bio;
                }

                if (address) {
                    submitData.address = address;
                }
                submitData.avatarUrl = user?.avatarUrl;
                dispatch(editProfileReady(submitData));
            }
        } catch (error) {
            console.error("Handle Submit Error:", error);
            toast.error("An error occurred during form submission");
        }
    };

    return createPortal(
        <React.Fragment>
            <Dialog
                fullScreen={width < 576}
                open={isOpenEditDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{ borderRadius: "16px" }}
            >
                <Box sx={{ width: "520px", height: "fit-content", display: "flex", flexDirection: "column", backgroundColor: "white", alignItems: "center", padding: "24px" }}>
                    <Box component={"img"} src={preview ? preview : user?.avatarUrl ? user?.avatarUrl : DefaultUser} sx={{ width: "86px", height: "86px", borderRadius: "50%", outline: "1px solid rgba(0,0,0,0.1)", objectFit: "cover" }}></Box>
                    <Box sx={{ position: "relative", marginTop: "16px" }}>
                        <ButtonRoot style={{ width: "fit-content", outline: "1px solid rgba(0,0,0,0.1)", padding: "4px 32px", fontSize: "15px", textTransform: "unset", borderRadius: "24px", background: "white", color: "black" }} text="Tải ảnh lên">
                        </ButtonRoot>
                        <input id="avatar" name="avatar" accept="image/png, image/jpeg, gif" onChange={handleChangeFile} type="file" style={{ position: "absolute", top: 0, left: 0, right: 0, opacity: 0, cursor: "pointer" }} />
                    </Box>
                    <Box sx={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                    <Box sx={{ width: "48%", marginTop: "24px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                        <Typography>Tên</Typography>
                        <LockOutlinedIcon sx={{ fontSize: "20px", marginRight: "6px" }} />
                        <InputBase sx={{ color: "#999" }} readOnly value={user?.fullName}></InputBase>
                    </Box>
                    <Box sx={{ width: "48%", marginTop: "24px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                        <Typography>Địa chỉ</Typography>
                        <InputBase sx={{ color: "black" }} value={address} onChange={handleChangeAddress}></InputBase>
                    </Box>
                    </Box>
                    <Box sx={{ width: "100%", marginTop: "24px", padding: "6px 0px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                        <Typography>Email</Typography>
                        <Box>
                            <LockOutlinedIcon sx={{ fontSize: "20px", marginRight: "6px" }} />
                            <InputBase sx={{ color: "#999" }} readOnly value={user?.email}></InputBase>
                        </Box>
                    </Box>
                    <Box sx={{ width: "100%", marginTop: "24px", padding: "6px 0px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                        <Typography>Tiểu sử</Typography>
                        <InputBase value={bio ? bio : ""} onChange={handleChangeBio}></InputBase>

                    </Box>
                    <Box sx={{ width: "100%", marginTop: "24px" }}>
                        <ButtonRoot onClick={handleSubmit} style={{ width: "100%", padding: "16px", fontSize: "15px" }} text="Cập nhật" />
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
        , document.querySelector("#root")
    )
}

export default DialogEditProfile