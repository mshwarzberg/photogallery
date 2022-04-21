require('dotenv').config()
const express = require('express')
const router = express.Router()
const fs = require('fs')
const db = require('../../config/mysql')
const authandsecurity = require('../authandsecurity')

router.delete('/delete', (req, res) => {
  
  const moveToTrash = 'UPDATE images SET isintrash=true WHERE id=? and nameinserver=?'

  db.query(moveToTrash, [req.body.id, req.body.nameinserver], (err, data) => {
    if (err) console.log(err);
    else {
      fs.rename(`./images/${req.body.id}/${req.body.nameinserver}`, `./images/${req.body.id}/trash/${req.body.nameinserver}`, (err, data) => {
        if (err) console.log(err);
      })
    }
    res.send({res: 'success'})
  })
})

router.post('/likeunlike', (req, res) => {

  const { id, nameinserver, value } = req.body

  const updateIsFavorite = 'UPDATE images SET isinfavorites=? WHERE id=? and nameinserver=?'

  db.query(updateIsFavorite, [value, id, nameinserver], (err, data) => {
    if (err) return console.log(err);
    else {
      return res.send({msg: 'Updated'})
    }
  })
})

module.exports = router