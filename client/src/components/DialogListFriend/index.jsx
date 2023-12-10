import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import { Typography, Dialog, Box } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { closeUserDialog } from '../../store/redux/reducers/appReducer';
import useWindowDimensions from '../../utils/useWindowDimensions';
import ListUser from '../ListUser';
import { useLocation } from 'react-router-dom';

const DialogListFriend = ({ title, listuserRender }) => {
    const { isOpenUserDialog } = useSelector(state => state.appReducer);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const { user } = useSelector(state => state.userReducer)
    const handleClose = () => {
        dispatch(closeUserDialog());
    };

    return createPortal(
        <React.Fragment>
            <Dialog
                fullScreen={width < 576}
                open={isOpenUserDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <Box sx={{ width: "520px", padding: "24px", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ padding: "6px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                        <Typography sx={{ fontSize: "20px", fontWeight: "700", textAlign: "center" }}>Danh sách bạn bè</Typography>
                    </Box>
                    <Box sx={{ marginTop: "24px" }}>
                        <ListUser listData={user?.friends} />
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
        , document.querySelector("#root")
    )
}

export default DialogListFriend