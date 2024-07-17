import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { RedirectToSignIn, SignIn } from '@clerk/clerk-react'
import ViewImage from './components/ViewImage'
import DashBoard from './components/DashBoard'

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<RedirectToSignIn />} />
        <Route path='/view/:imgName' element={<ViewImage />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </div>
  )
}

export default App