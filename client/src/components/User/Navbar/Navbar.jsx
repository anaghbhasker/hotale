import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../../../Store/Slice/Userauth'
import './Navbar.css'

function Navbar() {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const [currentUser, setcurrentUser] =useState(null)
  const { name }=useSelector((state)=>state.userLogin)
  console.log(name)

  useEffect(()=>{
    if(name){
      setcurrentUser(name);
    }else{
      setcurrentUser(null);
    }
  },[])

  const handleLogout=()=>{
    dispatch(
      setLogout({
        user: null,
        name: null,
        token: null,
      })
    )
    setcurrentUser(null);
    navigate('/login')
  }
  
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">HOTALE</span>
        <div className="navItems">
          {currentUser?<button className="navButton">{currentUser}</button>:<button className="navButton" onClick={()=>{navigate('/signup')}}>Register</button>}
          {currentUser?<button className="navButton" onClick={handleLogout}>Logout</button>:<button className="navButton" onClick={()=>{navigate('/login')}}>Login</button>}
        </div>
      </div>
    </div>
  )
}

export default Navbar