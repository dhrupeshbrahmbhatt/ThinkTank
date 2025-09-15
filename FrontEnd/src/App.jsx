import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Banner from './Components/Banner'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Banner" element={<Banner />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
