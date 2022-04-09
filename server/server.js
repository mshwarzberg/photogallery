const express = require('express')
const app = express()
const register = require('./routes/accounts/createaccount')
const login = require('./routes/accounts/login')
const profile = require('./routes/accounts/profile')
const upload = require('./routes/gallery/upload')
const viewphotos = require('./routes/gallery/viewphotos')

const db = require('./config/mysql')

app.use(express.json())

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('Connected to MYSQL Server');
})

app.listen(5000, () => {
    console.log('Now listening on port 5000');
})

app.use('/register', register)
app.use('/login', login)
app.use('/profile', profile)
app.use('/upload', upload)
app.use('/gallery', viewphotos)