import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import Activity from "./pages/Activity";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import { AuthProvider } from "./store/context/AuthContext";
import { Provider } from 'react-redux'
import { store } from "./store/redux/config/configRedux";
import { createTheme, ThemeProvider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { PrivateRouteComponent } from "./components/PrivateRouteComponent"
import useWindowDimensions from "./utils/useWindowDimensions";


function App() {
  const {width} = useWindowDimensions();

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Helvetica',
        'Roboto',
      ].join(','),
    },
  });
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);



  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick
            rtl={false}
            theme="light"
            style={{ width: width < 576 ? "100vw" : "max-content" }}
          />
          <Routes>
            <Route
              element={<PrivateRouteComponent children={<MainLayout />} />}
            >
              <Route
                index
                element={<Home />}
              />
              <Route path="/search" element={<Search />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
