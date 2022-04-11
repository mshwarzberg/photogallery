const express = require('express')
const router = express.Router()

const db = require('../../config/mysql')

let id
let reqNum

router.post('/getid', (req, res) => {
    id = req.body.id
    reqNum = req.body.reqNum
    res.end()
})

router.get('/', (req, res) => {
    const getImages = "SELECT nameinserver from images WHERE id=? ORDER BY nameinserver DESC;"
    db.query(getImages, [id], (err, data) => {
        if (err) console.log(err);
        console.log(data);
        for (let i = 0; i <= data.length; i++) {
            if (i === reqNum && data[reqNum]) {
                res.sendFile(`/images/${id}/${data[reqNum].nameinserver}`, {root: './'})
            }
        }
    })
})

module.exports = router