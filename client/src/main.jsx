import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'; 
import { history } from './utils/history.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>
)
