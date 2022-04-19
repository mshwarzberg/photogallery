require("dotenv").config();
const express = require('express')
const cors = require('cors')
const app = express()

const JsonWebTokens = require('./routes/JsonWebToken')

app.use(cors())
app.use(express.json())

app.listen(4000, () => {
  console.log('Auth Server', 4000);
})

app.use('/auth/verify', JsonWebTokens.authenticateToken)
app.use('/auth/newtoken', JsonWebTokens.newAccessToken)
app.use('/auth/logout', JsonWebTokens.logout)