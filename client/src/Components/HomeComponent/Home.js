import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../NavbarComponent/Navbar'

function Home() {
  return (
    <>
      <Navbar />
    <div>Home</div>
    <Link to={'/'}>click</Link>
    </>
  )
}

export default Home