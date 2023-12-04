import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LogoHomePage from "../../../assets/images/logo.png";
import authServices from "../../../service/authServices";
import { useAuth } from "../../../store/AuthContext";
import { Box, Typography, FormControl, Input } from "@mui/material"
import ButtonRoot from "../../../components/ButtonRoot";

function Login() {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const navigate = useNavigate();
  const { userInfo, saveUserInfo } = useAuth();

  const handleLogin = async () => {
    let username = "";
    let password = "";
    if (usernameInput?.current && passwordInput?.current) {
      username = usernameInput?.current?.value;
      password = passwordInput?.current?.value;
      if (!username || !password) {
        toast.warning("Please fill all required fields!");
      } else {
        try {
          let response = await authServices.login({
            username: username,
            password: password,
          });
          if (response?.status === 200 || response?.status === 201) {
            console.log(response);
            localStorage.setItem("token", response?.data?.data?.token);
            localStorage.setItem(
              "user",
              JSON.stringify(response?.data?.data?.user)
            );
            saveUserInfo(response?.data?.data?.user);
            navigate("/");
            toast.success("Login successfully! ");
          }
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data);
        }
      }
    }
    else {
      toast.error("Oops! Something went wrong");
    }
  };

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
            <ButtonRoot text={"Đăng nhập"} onClick={() => handleLogin()} />
          </Box>
          <Box>
            <Typography>Bạn quên mật khẩu ư ?</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <hr style={{ width: "72px", height: "2px" }} />
            <Typography>hoặc</Typography>
            <hr style={{ width: "72px", height: "2px" }} />
          </Box >
          <Box sx={{ width: "60%" }}>
          <ButtonRoot bgColor="white" textColor="black" style={{border:"2px solid  rgba(0,0,0,0.2)"}} text={"Đăng ký"} onClick={() => navigate("/register")} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
