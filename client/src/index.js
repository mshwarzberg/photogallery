import React from 'react';
import * as ReactDOMClient from 'react-dom/client'
import App from './App';
import './Components/General/general-css/navbar.css'
import './Components/Account/account-css/profile.css'
import './Components/Account/account-css/register.css'
import './Components/General/general-css/index.css'

const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container)

root.render(<App tab='home'/>)

