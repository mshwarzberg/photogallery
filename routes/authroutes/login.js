const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../config/mysql");
const router = express.Router();
const jwt = require("jsonwebtoken");

// current date plus half an hour
let currentDate = Math.floor(Date.now() / 1000) + (30 * 60)

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn:  currentDate});
}

router.post("/", (req, res) => {
  const comparetodb =
    "SELECT userpass, id, email FROM Credentials WHERE username=? or email=?";
  db.query(comparetodb, [req.body.username, req.body.email], (err, data) => {
    if (err) console.log(err);

    if (data.length === 0) {
      return res.status(404).send({ err: "User not found" });
    }
    
    if (bcrypt.compareSync(req.body.password, data[0].userpass)) {

      const userInfo = {
        username: req.body.username,
        email: data[0].email,
        id: data[0].id,
      };
      const accessToken = generateAccessToken(userInfo);
      const refreshToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);

      const addRefreshToDB = 'UPDATE credentials SET refreshtoken=? WHERE id=?'

      db.query(addRefreshToDB, [refreshToken, data[0].id], (err, data) => {
        if (err) console.log(err);
        return data
      })
      
      return res.status(200).send({
        msg: "MMHURaqxrhtyJR0uauiyXWenHOPyxQPyk9fr6z4hO2sUgtHXrv",
        id: data[0].id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: currentDate // plus half an hour
      });
    } else {
      return res.status(401).send({ err: "Incorrect password" });
    }
  });
});

module.exports = router;
