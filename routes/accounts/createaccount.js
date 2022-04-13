const express = require("express");
const db = require("../../config/mysql");
const bcrypt = require('bcrypt')
const fs = require('fs')
const router = express.Router();

const generateUUID = (length = 25) => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

router.post("/", async (req, res) => {
  const id = generateUUID()
  const salt = await bcrypt.genSalt()
  const hashedPass = bcrypt.hashSync(req.body.password, salt)
  const newuser =
    "INSERT INTO Credentials(id, username, email, userpass) VALUES(?,?,?,?)";
  db.query(
    newuser,
    [id, req.body.username, req.body.email, hashedPass],
    (err, data) => {
      if (err) {
        if (err.errno === 1062) {
          console.log('error');
          return res.send({err: 'duplicate found'});
        }
      }
      res.send({ msg: 'success!'})
      fs.mkdir(`./images/${id}`, (err) => {
        if (err) console.log(err);
      })
    }
  );
  
});

module.exports = router;
