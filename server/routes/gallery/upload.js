const express = require('express')
const router = express.Router()
const multer = require('multer')

let id

router.use(express.json())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `images/${id}`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

router.post('/getid', (req, res) => {
    if (req.body.id) {
        id = req.body.id
    }
    res.send('damn you')
})

router.post('/', upload.single("image"), (req, res) => {
    return
})

module.exports = router