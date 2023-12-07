import React from 'react'
import { createPortal } from 'react-dom';
import { useWindowSize } from "@uidotdev/usehooks";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { closeCreateDialog } from '../../store/redux/reducers/appReducer';

const CreateDialog = () => {
    const { isOpenCreateDialog } = useSelector(state => state.appReducer)
    const size = useWindowSize();
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(closeCreateDialog());
    };

    return createPortal(
        <React.Fragment>
            <Dialog
                fullScreen={size?.width < 576}
                open={isOpenCreateDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
        , document.querySelector("#root")
    )
}

export default CreateDialog