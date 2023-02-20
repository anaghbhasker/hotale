import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmailVerify from '../components/User/Emailverify/EmailVerify'


import LoginPage from '../pages/Login/LoginPage'
import SignupPage from '../pages/Signup/SignupPage'
import HomePage from '../pages/User/HomePage'
import HotelsPage from '../pages/User/HotelsPage'



function User() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
        <Routes>
          <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
        <Routes>
          <Route path='/users/:id/verify/:token'  element={<EmailVerify/>} />
        </Routes>
        <Routes>
          <Route path='/hotels' element={<HotelsPage/>}/>
        </Routes>
    </div>
  )
}

export default User