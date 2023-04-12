import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Pilots } from './pages/Pilots/Pilots.page'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Planes } from 'pages/Planes/Planes.page';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<Pilots />} />
        <Route path="/pilots" element={<Pilots />} />
        <Route path="/planes" element={<Planes />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
