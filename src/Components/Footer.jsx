import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='flex justify-between items-center gap-x-1 font-mono'>
    <div>:)</div>
    <div className='flex justify-between items-center gap-x-2'>
      <Link to='/docs' className='hover:underline'>Docs</Link>
      <a href="" target='blank' className='hover:underline'>Code</a>
    </div>
    </footer>
  )
}

export default Footer
