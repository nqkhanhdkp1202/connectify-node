import React from 'react'
import Post from '../Post'
import ListEmpty from '../ListEmpty'
import { Box } from '@mui/material';

const ListPost = ({ listPost }) => {
  return (
    <>
      {
        listPost?.length > 0 ? listPost?.map((e, i) => (
          <Post key={i} author={e?.author} content={e?.content} comments={e?.comments} likedBy={e?.likedBy} createdAt={e?.createdAt} imageUrls={e?.imageUrls} />
        )) : <Box sx={{ width: "100%", height: "100%", marginTop:"36px" }}>
          <ListEmpty />
        </Box>
      }
    </>
  )
}

export default ListPost