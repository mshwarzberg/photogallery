const express = require('express')
const router = express.Router()

const db = require('../../config/mysql')

router.post('/', (req, res) => {
    let ImagesArr = []
    const getImages = "SELECT nameinserver from images WHERE id=? LIMIT 3;"
    db.query(getImages, [req.body.id], (err, data) => {
        if (err) console.log(err);
        for (let i = 0; i < data.length; i++) {
            ImagesArr.push(data[i].nameinserver)
        }
        res.send(ImagesArr)
    })
})

module.exports = router