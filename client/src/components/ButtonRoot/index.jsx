import React from 'react'
import { Button } from "@mui/material"

const ButtonRoot = ({ text, bgColor = "black", textColor = "white", onClick , style, disabled = false}) => {
    return (
        <Button disabled={disabled} onClick={onClick} sx={{ width: "100%", backgroundColor: bgColor , color: textColor, borderRadius: "16px", textTransform:"unset",":hover": { backgroundColor: bgColor }, ...style}}>{text}</Button>
    )
}

export default ButtonRoot