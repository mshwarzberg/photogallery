require('dotenv').config()
const express = require('express')
const router = express.Router()
const fs = require('fs')
const db = require('../../config/mysql')
const JsonWebToken = require('../JsonWebToken')

router.delete('/delete', JsonWebToken.authenticateToken, (req, res) => {
  
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
module.exports = router