const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../config/mysql");
const router = express.Router();

router.post("/", (req, res) => {
  
  const comparetodb = "SELECT userpass, id FROM Credentials WHERE username = ?";
  db.query(comparetodb, [req.body.username], (err, data) => {
    if (err) console.log(err);
    console.log(data);
    console.log(data.length === 0);
    if (data.length === 0) {
      return res.status(404).send({ err: "User not found "});
    }
    if (bcrypt.compareSync(req.body.password, data[0].userpass)) {
      return res.status(200).send({msg: 'MMHURaqxrhtyJR0uauiyXWenHOPyxQPyk9fr6z4hO2sUgtHXrv', token: data[0].id})
    }
    else {
      return res.status(401).send({err: 'Incorrect password'})
    }
  });
});

module.exports = router 
 