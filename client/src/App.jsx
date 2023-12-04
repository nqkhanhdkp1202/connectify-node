import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRouteComponent } from "./components/PrivateRouteComponent";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./store/AuthContext";
import { DialogProvider } from "./store/DialogContext";
import Search from "./pages/Search";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <DialogProvider>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
          rtl={false}
          theme="light"
        />
        <Routes>
          <Route
            path="/"
            element={<MainLayout />}
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
      </DialogProvider>
    </AuthProvider>
  );
}

export default App;
