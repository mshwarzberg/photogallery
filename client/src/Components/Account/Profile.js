import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Profile() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: ''
  })

  function getUser() {
    return sessionStorage.getItem('token') || null
  }

  useEffect(() => {
    axios.post('http://localhost:5000/profile', {token: getUser()})
          .then(res => {
            setUserInfo(({
              username: res.data[0].username,
              email: res.data[0].email
            }))
          })
          .catch(err => {
            console.log(err);
          })
  }, [])

  return (
    <div className='profile--page'>{userInfo.username}, {userInfo.email}</div>
  )
}

export default Profile