import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminDashboardPage from '../pages/Admin/AdminDashboardPage'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import AdminShowOwnerPage from '../pages/Admin/AdminShowOwnerPage'
import AdminShowUsersPage from '../pages/Admin/AdminShowUsersPage'
import AdminShowHotelPage from '../pages/Admin/AdminShowHotelPage'

function Admin() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<AdminDashboardPage/>}/>
        </Routes>
        <Routes>
          <Route path='/login' element={<AdminLoginPage/>}/>
        </Routes>
        <Routes>
          <Route path='/showUsers' element={<AdminShowUsersPage/>}/>
        </Routes>
        <Routes>
          <Route path='/showOwners' element={<AdminShowOwnerPage/>}/>
        </Routes>
        <Routes>
          <Route path='/showHotel' element={<AdminShowHotelPage/>}/>
        </Routes>

    </div>
  )
}

export default Admin