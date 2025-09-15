import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Banner from './Components/Banner'
import PortfolioGenerator from './pages/PortfolioGenerator'
import Portfolio1 from './Components/Portfolio1'
import Portfolio2 from './pages/Portfolio2'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio-generator" element={<PortfolioGenerator />} />
          <Route path="/portfolio-generator/banner" element={<Banner />} />
          <Route path="portfolio-generator/Banner" element={<Banner />} />
          <Route path="portfolio-generator/Portfolio1" element={<Portfolio1 />} />
          <Route path="portfolio-generator/Portfolio2" element={<Portfolio2 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
