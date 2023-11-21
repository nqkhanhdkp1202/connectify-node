import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const _user = localStorage.getItem("user");
  const _token = localStorage.getItem("token");

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (_token) {
      setToken(_token);
    }
  }, [_token]);

  const saveUserInfo = (user) => {
    if (user) {
      setUserInfo(user);
    }
  };

  useEffect(() => {
    saveUserInfo(JSON.parse(_user));
  }, [_user]);

  const logout = () => {
    setToken("");
    setUserInfo({});
  };

  return (
    <AuthContext.Provider value={{ token, userInfo, saveUserInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
