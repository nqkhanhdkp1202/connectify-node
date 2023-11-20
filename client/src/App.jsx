import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import MainLayout from './layouts/MainLayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import { useEffect, useState } from 'react';

function App() {

  return (
    <>
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
            path={"/"}
            element={<Home />}
          />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />.
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
