require("dotenv").config();
const express = require('express')
const cors = require('cors')
const auth = express()

const JsonWebTokens = require('./routes/JsonWebToken')

auth.use(cors())
auth.use(express.json())

auth.listen(4000, () => {
  console.log('Auth Server', 4000);
})

auth.use('/auth/verify', JsonWebTokens.middlewareAuthentication)
auth.use('/auth/newtoken', JsonWebTokens.newAccessToken)
auth.use('/auth/logout', JsonWebTokens.logout)