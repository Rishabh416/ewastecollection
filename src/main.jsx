import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Admin from './Admin.jsx'
import Booking from './Booking.jsx'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    
    <Router>
        <nav>
          <Link className='m-2 p-2 bg-buttonColor rounded-xl text-xl text-white' to="/">HOME</Link>
          <Link className='m-2 p-2 bg-buttonColor rounded-xl text-xl text-white' to="/admin">ADMIN</Link>
        </nav>

        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/:id" element={<Booking />}></Route>
        </Routes>
    </Router>

  </React.StrictMode>,
)
