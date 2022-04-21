const express = require("express");
const router = express.Router();
const db = require("../../config/mysql");
const authandsecurity = require('../authandsecurity')

router.post("/getinfo", authandsecurity.tokenAuthentication, (req, res) => {
  const getData = "SELECT nameinserver,filesize FROM images where id=?";
  db.query(getData, [req.body.id], (err, data) => {
    if (err) {
      return res.send({ err: err });}
    else {
      let totalDataConsumed = 0;
      let amountofphotos = 0;
      for (let i = 0; i < data.length; i++) {
        amountofphotos += 1;
        totalDataConsumed += data[i].filesize;
      }

      const averagesize = totalDataConsumed / amountofphotos;
      
      const getUserInfo = "SELECT username, email FROM credentials WHERE id=?";

      db.query(getUserInfo, [req.body.id], (err, data) => {
        if (err) return res.send({ err: err });
        else {
          let username = data[0].username;
          let email = data[0].email;

          res.send({
            totaldataconsumed: totalDataConsumed,
            amountofphotos: amountofphotos,
            averagesize: averagesize,
            username: username,
            email: email,
          });
        }
      });
    }
  });
});

module.exports = router;
