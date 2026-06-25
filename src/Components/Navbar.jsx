import React from 'react'
import ThemeChanger from './ThemeChanger'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center gap-x-1'>
    <Link to='/' className='font-mono hover:underline font-semibold'>home</Link>
      <ThemeChanger/>
    </nav>
  )
}

export default Navbar
