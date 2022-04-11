import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()

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
            if (res.data[0] === undefined) {
              return navigate('/login')
            }
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
    <div className='page'>
      <h1>
        {userInfo.username}
      </h1>
      <h1>
        {userInfo.email}
      </h1>
      <button onClick={() => {
        navigate('/gallery')
      }}>View My Photos</button>
    </div>
  )
}

export default Profile