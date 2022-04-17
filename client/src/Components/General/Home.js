import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div id='home--page'>
      <h1 id='home--title'>Your Photo Gallery</h1>
      <h2 id='home--description'>Have you ever wished for something to be more streamlined? After&nbsp;<mark title="Click here to create your account" onClick={() => navigate('/register')} id='home--register-link'>making an account</mark>&nbsp;you can begin to upload all your photos and view them right away for the most streamlined streamlining you will ever streamline. I make the best products ever. Trust me! Also I super value your privacy, so I'll never look at your personal photos, or sell your data for personal gain.</h2>
    </div>
  )
}

export default Home