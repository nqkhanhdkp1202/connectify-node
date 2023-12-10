import React from 'react'
import { Dialog, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import useWindowDimensions from '../../utils/useWindowDimensions';
import { closeLoadDialog } from '../../store/redux/reducers/appReducer';
import { useSelector } from 'react-redux';

const LoadingScreen = () => {
    const { isOpenLoadDialog } = useSelector(state => state.appReducer);
    const handleClose = () => {
        closeLoadDialog();
    };

    return (
        <Dialog
            fullScreen
            open={isOpenLoadDialog}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            sx={{ "& .MuiPaper-root": { backgroundColor: "rgba(0,0,0,0.23)" } }}
        >
            <Box sx={{ width: "100%", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <CircularProgress size={46} thickness={6} sx={{ color: "#999" }} />
            </Box>
        </Dialog>
    )
}

export default LoadingScreen