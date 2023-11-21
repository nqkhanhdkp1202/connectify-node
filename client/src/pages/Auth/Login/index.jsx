import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LogoHomePage from "../../../assets/images/logo.png";
import authServices from "../../../service/authServices";
import { useAuth } from "../../../store/AuthContext";
import "./index.css";

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
  };

  return (
    <MDBContainer
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="py-5 gradient-form"
    >
      <MDBRow
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src={LogoHomePage} alt="Logo" style={{ width: "184px" }} />
              <h4 className="mt-1 mb-5 pb-1">Please login to your account</h4>
            </div>

            <form onSubmit={handleLogin}>
              <MDBInput
                ref={usernameInput}
                wrapperClass="mb-4"
                label="Username"
                id="form1"
                type="username"
              />
              <MDBInput
                ref={passwordInput}
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
              />
            </form>

            <div className="text-center pt-1 mb-5 pb-1">
              <button
                style={{
                  border: "none",
                  outline: "none",
                  padding: "12px 4px",
                  borderRadius: "4px",
                  color: "white",
                }}
                onClick={handleLogin}
                className="mb-4 w-100 gradient-custom-2"
              >
                Sign in
              </button>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="mb-0 me-1">Don't have an account?</p>
              <Link to="/register" children={"Register"} />
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div
            style={{ minHeight: "500px", maxHeight: "500px" }}
            className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4"
          >
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
