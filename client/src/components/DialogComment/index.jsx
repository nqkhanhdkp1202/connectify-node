import React from 'react'
import useWindowDimensions from '../../utils/useWindowDimensions';
import { createPortal } from 'react-dom';
import { Dialog, Box, Typography } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { clearListComment, closeCommentDialog } from '../../store/redux/reducers/appReducer';
import ListEmpty from '../ListEmpty';
import Comment from '../Comment';

const DialogComment = () => {
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();
    const { isOpenCommentDialog, listComment } = useSelector(state => state.appReducer)
    const handleClose = () => {
        dispatch(clearListComment())
        dispatch(closeCommentDialog());
    };
    return createPortal(
        <React.Fragment>
            <Dialog
                fullScreen={width < 576}
                open={isOpenCommentDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <Box sx={{ width: "600px", padding: "32px 24px", minHeight: "50vh", display: "flex", flexDirection: "column", position: "relative" }}>
                    <Box sx={{ padding: "6px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                        <Typography sx={{ fontSize: "20px", fontWeight: "700", textAlign: "center" }}>Bình luận của bài viết</Typography>
                    </Box>
                    <Box sx={{ marginTop: "4px" }}>
                        {
                            listComment?.length > 0 ? listComment?.map((e, i) => <Comment key={i} author={e?.author} content={e?.content} />) : <ListEmpty />
                        }
                    </Box>
                    <Comment isEdit />
                </Box>
            </Dialog>
        </React.Fragment>
        , document.querySelector("#root")
    )
}

export default DialogComment