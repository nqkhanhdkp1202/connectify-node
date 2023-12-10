import React, { useState } from 'react'
import { Box, Typography, InputBase } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import ListUser from '../../components/ListUser';
import { useDispatch, useSelector } from "react-redux"
import { getListUserReady, getUserInfoReady } from '../../store/redux/reducers/userReducer';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';

const Search = () => {
  const { listUser, user } = useSelector(state => state.userReducer);
  const [focus, setFocus] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [filterArray, setFilterArray] = useState([]);
  const [infoUser, setInfoUser] = useState({});
  const tempArray = listUser?.filter(item => item?.fullName?.includes(debouncedInputValue));
  const dispatch = useDispatch();
  useEffect(() => {
    if(user){
      setInfoUser(user);
    }
  },[user]);

  useEffect(() => {
    if(listUser){
      setFilterArray(listUser)
    }
  }, [listUser])

  useEffect(() => {
    dispatch(getUserInfoReady());
    dispatch(getListUserReady());
  }, [dispatch]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    setLoading(true);
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, 500]);

  return (
    <Box sx={{ padding: "12px 0" }}>
      <Box sx={{ display: "flex", alignItems: "center", outline: "1px solid rgba(0,0,0,0.1)", borderRadius: "16px", padding: "12px", boxShadow: focus && "0 12px 24px 0 rgba(0,0,0,0.08)", transition: ".3s ease", backgroundColor: focus ? "white" : "rgba(0,0,0,0.01)" }}>
        <SearchIcon sx={{ fontSize: "24px", color: "#999" }} />
        <InputBase value={inputValue} onChange={handleInputChange} sx={{ marginLeft: "12px", width: "85%" }} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder='Tìm kiếm' />
      </Box>
      <Box sx={{ marginTop: "24px" }}>
        {
          loading ? <Box sx={{ width: "100%", margin: 'auto', display: "flex", justifyContent: "center", alignItems: "center", padding: "24px", minHeight: "70vh" }}>
            <CircularProgress color="inherit" />
          </Box> :
            <Box sx={{ width: "100%", minHeight: "70vh" }}>
              <ListUser listData={inputValue ? tempArray : filterArray} />
            </Box>
        }
      </Box>
    </Box>
  )
}

export default Search