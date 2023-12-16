import React from 'react'
import { Box } from "@mui/material"
import useWindowDimensions from '../../utils/useWindowDimensions'

const ContainerWrapper = ({children}) => {
    const {width} = useWindowDimensions();
    return (
        <Box sx={{ width: width > 576  ? "620px" : "100%", margin:"auto", padding:"0 24px"}}>
            {children}
        </Box>
    )
}

export default ContainerWrapper