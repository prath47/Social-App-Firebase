import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { RedirectToSignIn, SignIn } from '@clerk/clerk-react'

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<RedirectToSignIn />} />
      </Routes>
    </div>
  )
}

export default App