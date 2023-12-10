import React from 'react'
import {Box} from "@mui/material"

const ImageRoot = ({image,style}) => {
  return (
    <Box component={"img"} sx={{borderRadius:"8px",backgroundColor:"red", ...style, maxHeight:"250px", objectFit:"cover"}} src={image}>
    </Box>
  )
}

export default ImageRoot