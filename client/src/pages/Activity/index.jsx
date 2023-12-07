import { Box } from '@mui/material'
import React from 'react'
import Banner from "../../assets/banner/coming-soon.webp"

const Activity = () => {
  return (
    <Box sx={{width:"100%", height:"90vh"}}>
      <Box component={"img"} src={Banner} sx={{ margin:"auto"}}></Box>
    </Box>
  )
}

export default Activity