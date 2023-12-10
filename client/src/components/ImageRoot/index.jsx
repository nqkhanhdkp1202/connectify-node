import React from 'react'
import { Box } from "@mui/material"
import FancyBoxWrapper from '../FancyBoxWrapper'

const ImageRoot = ({ image, style }) => {
  return (
    <FancyBoxWrapper>
      <a data-fancybox="gallery" href={image}>
        <Box component={"img"} sx={{ borderRadius: "8px", backgroundColor: "red", ...style, height: "280px", objectFit: "cover" }} src={image}>
        </Box>
      </a>
    </FancyBoxWrapper>
  )
}

export default ImageRoot