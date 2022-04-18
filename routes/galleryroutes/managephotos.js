require('dotenv').config()
const express = require('express')
const router = express.Router()
const fs = require('fs')
const db = require('../../config/mysql')

router.post('/delete', (req, res) => {
  const deleteImage = 'DELETE FROM images WHERE nameinserver=? AND id=?'
  db.query(deleteImage, [req.body.servername, req.body.id], (err, data) => {
    if (err) console.log(err);
    else {
      fs.unlink(`./images/${req.body.id}/${req.body.servername}`, (err, data) => {
        if (err) console.log(err);
      })
    }
    res.send({response: data})
  })
})
module.exports = router