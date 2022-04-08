const express = require("express");
const db = require("../../config/mysql");
const bcrypt = require('bcrypt')
const fs = require('fs')
const router = express.Router();

const generateUUID = (length = 25) => {
  // Declare all characters
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Pick characers randomly
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
          res.send('duplicate found');
        }
      }
      console.log('data');
    }
  );
  fs.mkdir(`./images/${id}`, (err) => {
    if (err) console.log(err);
  })
});

module.exports = router;
