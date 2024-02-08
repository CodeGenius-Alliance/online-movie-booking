import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <>
    <nav className='my-nav'>
      <img src="/logo.svg" alt="" className='logo-img'/>
      <div><Link className='login-btn' to={'/login'}> USERLOGIN</Link><Link to={'/adminlogin'} className='login-btn'>ADMINLOGIN</Link></div>
      
    </nav>
    </>
  )
}

export default Navbar