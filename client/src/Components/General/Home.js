import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='home--page'>
      <h1 className='home--title'>Your Photo Gallery</h1>
      <h2 className='home--description'>After&nbsp;<mark onClick={() => navigate('/register')} id='home--register-link'>making an account</mark>&nbsp;you can begin to upload all your photos and view them right away for the most streamlined experience ever.</h2>
    </div>
  )
}

export default Home