import React from 'react'
import { createPortal } from 'react-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { closeCreateDialog } from '../../store/redux/reducers/appReducer';
import useWindowDimensions from '../../utils/useWindowDimensions';

const DialogCreatePost = ({children}) => {
    const { isOpenCreateDialog } = useSelector(state => state.appReducer);
    const dispatch = useDispatch();
    const {width} = useWindowDimensions();

    const handleClose = () => {
        dispatch(closeCreateDialog());
    };

    return createPortal(
        <React.Fragment>
            <Dialog
                fullScreen={width < 576}
                open={isOpenCreateDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                
            </Dialog>
        </React.Fragment>
        , document.querySelector("#root")
    )
}

export default DialogCreatePost