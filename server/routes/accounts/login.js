const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../config/mysql");

const router = express.Router();

router.post("/", (req, res) => {
  const comparetodb = "SELECT userpass FROM Credentials WHERE username = ?";
  db.query(comparetodb, [req.body.username], (err, data) => {
    if (err) console.log(err);
    if (data.length === 0) {
      res.send("user not found");
    }
    console.log(data[0].userpass);
    if (bcrypt.compareSync(req.body.password, data[0].userpass)) {
        res.send('logged in successfully')
    }
    else {
        res.send('login failed')
    }
  });
});

module.exports = router;
