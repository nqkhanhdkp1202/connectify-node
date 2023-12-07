import React from 'react'
import { Box } from "@mui/material"

const ContainerWrapper = ({children}) => {
    return (
        <Box sx={{ maxWidth: "620px", margin:"auto", padding:"0 24px"}}>
            {children}
        </Box>
    )
}

export default ContainerWrapper