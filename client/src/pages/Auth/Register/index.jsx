
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import LogoHomePage from '../../../assets/images/logo.png';
import authServices from '../../../service/authServices';
import {Box, Typography, FormControl} from "@mui/material"
import ButtonRoot from '../../../components/ButtonRoot';

function Register() {
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);
    const emailInput = useRef(null);
    const fullnameInput = useRef(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        let username = '';
        let password = '';
        let email = '';
        let fullname = '';
        if (usernameInput?.current && passwordInput?.current && emailInput?.current && fullnameInput?.current) {
            username = usernameInput?.current?.value;
            password = passwordInput?.current?.value;
            email = emailInput?.current?.value;
            fullname = fullnameInput?.current?.value;
            if (!username || !password || !email || !fullname) {
                toast.warning("Please fill all required fields!")
            }
            else {
                try {
                    let response = await authServices.register({ username: username, password: password, email: email, fullname: fullname });
                    if (response?.status === 200 || response?.status === 201) {
                        localStorage.setItem("token", response?.data?.data?.token);
                        toast.success("Register successfully! Please login");
                        navigate("/login")
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error?.response?.data)
                }
            }
        }
        else{
            toast.error("Oops! Something went wrong")
        }
    }

    return (
    <Box component={"div"} sx={{ backgroundImage: `url("https://source.unsplash.com/random/1920x1080/?city,night")`, width: "100vw", height: "100vh" }}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", backgroundColor: "rgba(255,255,255,0.8)", padding: "36px", borderRadius: "16px" }}>
        <Typography variant="h2" sx={{ fontSize: "42px", fontWeight: "800", letterSpacing: "2px" }}>connectify</Typography>
        <Typography variant="caption" sx={{ fontSize: "24px", fontWeight: "500" }}>Mạng xã hội với hơn 1 triệu lượt truy cập mỗi ngày</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center", gap:"24px" }}>
          <Box sx={{ marginTop: "24px" }}>
            <Typography variant="body1" sx={{ fontSize: "16px", fontWeight: "800" }}>Đăng nhập tài khoản connectify</Typography>
          </Box>
          <Box sx={{ width: "60%" }}>
            <FormControl sx={{ width: "100%",backgroundColor:"#f5f5f5", border:"2px solid rgba(0,0,0,0.2)", padding:"12px", borderRadius:"16px" }}>
              <input style={{border:"none",outline:"none",backgroundColor:"#f5f5f5",}} ref={usernameInput} placeholder="Tên người dùng"/>
            </FormControl>
          </Box>
          <Box sx={{ width: "60%" }}>
            <FormControl sx={{ width: "100%", backgroundColor:"#f5f5f5", border:"2px solid rgba(0,0,0,0.2)",padding:"12px",borderRadius:"16px" }}>
              <input style={{border:"none",outline:"none",backgroundColor:"#f5f5f5",}}  type="password" ref={passwordInput} placeholder="Mật khẩu"/>
            </FormControl>
          </Box>
          <Box sx={{ width: "60%" }}>
            <FormControl sx={{ width: "100%", backgroundColor:"#f5f5f5", border:"2px solid rgba(0,0,0,0.2)",padding:"12px",borderRadius:"16px" }}>
              <input style={{border:"none",outline:"none",backgroundColor:"#f5f5f5",}}  type="email" ref={emailInput} placeholder="Email"/>
            </FormControl>
          </Box>
          <Box sx={{ width: "60%" }}>
            <FormControl sx={{ width: "100%", backgroundColor:"#f5f5f5", border:"2px solid rgba(0,0,0,0.2)",padding:"12px",borderRadius:"16px" }}>
              <input style={{border:"none",outline:"none",backgroundColor:"#f5f5f5",}}  type="text" ref={fullnameInput} placeholder="Họ và tên"/>
            </FormControl>
          </Box>
          <Box sx={{ width: "60%" }}>
            <ButtonRoot style={{padding:"16px"}} text={"Đăng ký"} onClick={() => handleRegister()} />
          </Box>
          <Box>
            <Typography>Bạn đã có tài khoản ?</Typography>
          </Box>
          <Box sx={{ width: "60%" }}>
          <ButtonRoot bgColor="white" textColor="black" style={{border:"2px solid rgba(0,0,0,0.2)", padding:"16px"}} text={"Đăng nhập"} onClick={() => navigate("/login")} />
          </Box>
        </Box>
      </Box>
    </Box>
    );
}

export default Register;