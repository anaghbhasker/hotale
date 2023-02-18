import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmailVerify from '../components/User/Emailverify/EmailVerify'


import Home from '../pages/Home/Home'
import LoginPage from '../pages/Login/LoginPage'
import SignupPage from '../pages/Signup/SignupPage'



function User() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
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
    </div>
  )
}

export default User