import React, { useEffect, useState } from 'react'
import { Box, Typography, InputBase } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import ListUser from '../../components/ListUser';
import { useDispatch, useSelector } from "react-redux"
import { getListUserReady } from '../../store/redux/reducers/userReducer';

const Search = () => {
  const { listUser, user } = useSelector(state => state.userReducer);
  const [focus, setFocus] = useState(false);
  console.log("Re-render");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListUserReady());
  }, [])


  return (
    <Box sx={{ padding: "12px 0" }}>
      <Box sx={{ display: "flex", alignItems: "center", outline: "1px solid rgba(0,0,0,0.1)", borderRadius: "16px", padding: "12px", boxShadow: focus && "0 12px 24px 0 rgba(0,0,0,0.08)", transition: ".3s ease", backgroundColor: focus ? "white" : "rgba(0,0,0,0.01)" }}>
        <SearchIcon sx={{ fontSize: "24px", color: "#999" }} />
        <InputBase sx={{ marginLeft: "12px", width: "85%" }} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder='Tìm kiếm' />
      </Box>
      <Box sx={{ marginTop: "24px" }}>
        <ListUser listData={listUser} />
      </Box>
    </Box>
  )
}

export default Search