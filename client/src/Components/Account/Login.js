import React, { useContext } from 'react'
import { UserAuth } from '../../App'

function Login() {
  const Context = useContext(UserAuth)

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => {
        Context.setIsAuth(true)
        localStorage.setItem('log', Context.isAuth)
      }}>
        Authenticate Me
      </button>
    </div>
  )
}

export default Login