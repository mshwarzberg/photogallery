import React, { useContext } from 'react'
import { UserAuth } from '../../App'


function Profile() {
  const CheckAuth = useContext(UserAuth)
  const istrue = localStorage.getItem('log')
  return (
    <div className='profile--page'>{istrue ? <h1>Logged in</h1> : <h1>Logged Out</h1>}</div>
  )
}

export default Profile