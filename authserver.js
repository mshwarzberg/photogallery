require("dotenv").config();
const express = require('express')
const cors = require('cors')
const auth = express()

const authandsecurity = require('./routes/authandsecurity')

auth.use(cors())
auth.use(express.json())

auth.listen(4000, () => {
  console.log('Auth Server', 4000);
})

auth.use('/auth/verify', authandsecurity.tokenAuthentication)
auth.use('/auth/newtoken', authandsecurity.newAccessToken)
auth.use('/auth/logout', authandsecurity.logOut)