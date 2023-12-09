import { Box } from '@mui/material'
import React from 'react'
import Banner from "../../assets/banner/coming-soon.gif"

const Activity = () => {
  return (
    <Box sx={{ width: "100%", height: "90vh", display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Box component={"img"} src={Banner} sx={{ margin: "auto", objectFit: "cover" }}></Box>
    </Box>
  )
}

export default Activity