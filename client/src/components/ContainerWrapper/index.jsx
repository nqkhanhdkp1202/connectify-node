import React from 'react'
import { Box } from "@mui/material"

const ContainerWrapper = ({children}) => {
    return (
        <Box sx={{ maxWidth: "560px", margin:"auto" }}>
            {children}
        </Box>
    )
}

export default ContainerWrapper