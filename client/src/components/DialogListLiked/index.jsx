import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import { Typography, Dialog, Box } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { clearListUserRender, closeLikedDialog } from '../../store/redux/reducers/appReducer';
import useWindowDimensions from '../../utils/useWindowDimensions';
import ListUser from '../ListUser';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const DialogListLiked = () => {
    const { isOpenLikedDialog, listUserRender, titleListUser } = useSelector(state => state.appReducer);
    const dispatch = useDispatch();
    const [listLiked, setListLiked] = useState([]);
    const { width } = useWindowDimensions();
    const handleClose = () => {
        dispatch(closeLikedDialog());
        dispatch(clearListUserRender());
    };

    return createPortal(
        <React.Fragment>
            <Dialog
                fullScreen={width < 576}
                open={isOpenLikedDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <Box sx={{ width: "520px", padding: "24px", minHeight:"40vh" ,display: "flex", flexDirection: "column" }}>
                    <Box sx={{ padding: "6px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                        <Typography sx={{ fontSize: "20px", fontWeight: "700", textAlign: "center" }}>{titleListUser}</Typography>
                    </Box>
                    <Box sx={{ marginTop: "24px" }}>
                        <ListUser listData={listUserRender} />
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
        , document.querySelector("#root")
    )
}

export default DialogListLiked