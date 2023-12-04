import React from 'react'
import { Button } from "@mui/material"

const ButtonRoot = ({ text, bgColor = "black", textColor = "white", onClick , style}) => {
    return (
        <Button onClick={onClick} sx={{ width: "100%", backgroundColor: bgColor, padding: "16px", color: textColor, borderRadius: "16px", ":hover": { backgroundColor: bgColor } , ...style}}>{text}</Button>
    )
}

export default ButtonRoot