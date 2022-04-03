import React from 'react'

function Navbar() {
  return (
    <nav className='navbar'>
        <a href="/" className='nav--home-link'>Home</a>
        <a href="/login" className='nav--login-link'>Login</a>
        <a href="/register" className='nav--register-link'>Register</a>
        <a href="/profile" className='nav--profile-link'>Profile</a>
        <button onClick={() => {
          localStorage.setItem('Check logged in', false)
        }}>Log Out</button>
    </nav>
  )
}

export default Navbar