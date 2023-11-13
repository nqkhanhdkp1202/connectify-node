import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './components/Login'
import MainLayout from './layouts/MainLayout'

function App() {

  return (
    // <BrowserRouter>
    // <Routes>
    //   <Route element={<MainLayout />  } />
    // </Routes>
    // </BrowserRouter>
    <MainLayout />
  )
}

export default App
