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
import { DialogProvider } from "./store/context/DialogContext";

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
