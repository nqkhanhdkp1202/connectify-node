import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import MainLayout from './layouts/MainLayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Auth/Register';
import Home from './pages/Home';

function App() {

  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <ToastContainer position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        theme="light"
      />
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Home />}
          />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
