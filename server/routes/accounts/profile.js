const express = require('express')
const router = express.Router()
const db = require('../../config/mysql')

router.post('/', (req, res) => {
    const findbyid = 'SELECT username, email FROM Credentials WHERE id = ?'
    db.query(findbyid, [req.body.token], (err, data) => {
        if (err) console.log(err);
        res.send(data)
    })
})

module.exports = router