import React from 'react'
import { createPortal } from 'react-dom';
import { Box, Dialog, Typography, InputBase } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { closeCreateDialog, closeEditDialog } from '../../store/redux/reducers/appReducer';
import useWindowDimensions from '../../utils/useWindowDimensions';
import DefaultUser from '../../assets/images/default-user.png'
import ButtonRoot from '../ButtonRoot';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const DialogEditProfile = ({ children }) => {
    const { isOpenEditDialog } = useSelector(state => state.appReducer);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();

    const handleClose = () => {
        dispatch(closeEditDialog());
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
                    <Box component={"img"} src={DefaultUser} sx={{ width: "86px", height: "86px", borderRadius: "50%", outline: "1px solid rgba(0,0,0,0.1)" }}></Box>
                    <Box sx={{ position: "relative", marginTop: "16px" }}>
                        <ButtonRoot style={{ width: "fit-content", outline: "1px solid rgba(0,0,0,0.1)", padding: "4px 32px", fontSize: "15px", textTransform: "unset", borderRadius: "24px", background: "white", color: "black" }} text="Tải ảnh lên">
                        </ButtonRoot>
                        <input type="file" style={{ position: "absolute", top: 0, left: 0, right: 0, opacity: 0, cursor: "pointer" }} />
                    </Box>
                    <Box sx={{ width: "100%", marginTop: "24px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                        <Typography>Tên</Typography>
                        <InputBase></InputBase>
                    </Box>
                    <Box sx={{ width: "100%", marginTop: "24px", padding: "6px 0px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                        <Typography>Tài khoản</Typography>
                        <Box>
                            <LockOutlinedIcon sx={{fontSize:"20px", marginRight:"6px"}}/>
                            <InputBase readOnly value={"ABC"}></InputBase>
                        </Box>
                    </Box>
                    <Box sx={{ width: "100%", marginTop: "24px", padding: "6px 0px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                        <Typography>Tiểu sử</Typography>
                        <InputBase></InputBase>

                    </Box>
                    <Box sx={{ width: "100%", marginTop: "24px" }}>
                        <ButtonRoot style={{ width: "100%", padding: "16px", fontSize: "15px" }} text="Cập nhật" />
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
        , document.querySelector("#root")
    )
}

export default DialogEditProfile