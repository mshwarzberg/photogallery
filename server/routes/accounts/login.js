const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../config/mysql");

const router = express.Router();

router.post("/", (req, res) => {
  const comparetodb = "SELECT userpass, id FROM Credentials WHERE username = ?";
  db.query(comparetodb, [req.body.username], (err, data) => {
    if (err) console.log(err);
    if (data.length === 0) {
      return res.send({msg: "user not found"});
    }

    if (bcrypt.compareSync(req.body.password, data[0].userpass)) {
        res.send({msg: 'logged in successfully', token: data[0].id})
    }
    else {
        res.send({msg: 'incorrect password'})
    }
  });
});

module.exports = router 
 