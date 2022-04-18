require("dotenv").config();
const express = require('express')
const cors = require('cors')
const app = express()

const authenticatetoken = require('./routes/authroutes/authenticatetoken')
const refreshtoken = require('./routes/authroutes/refreshtoken')
app.use(cors())
app.use(express.json())

app.listen(4000, () => {
  console.log('Auth Server', 4000);
})

app.use('/auth/profile', authenticatetoken)
app.use('/auth/refreshtoken', refreshtoken,)