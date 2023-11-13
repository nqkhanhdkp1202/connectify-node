import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './components/Login'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Feed from './components/Feed'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Feed />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
