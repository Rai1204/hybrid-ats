import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ApplicantDashboard from './pages/ApplicantDashboard'
import BotMimicDashboard from './pages/BotMimicDashboard'
import AdminDashboard from './pages/AdminDashboard'
import './styles.css';


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/applicant' element={<ApplicantDashboard/>} />
        <Route path='/botmimic' element={<BotMimicDashboard/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
