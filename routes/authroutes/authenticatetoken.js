const express = require('express')
const router = express.Router()
const db = require("../../config/mysql");
const jwt = require("jsonwebtoken");
  
function authenticateToken(req, res, next) {
  const { authorization } = req.headers
  if (authorization === null)
  return res.status(401).send({ err: "User is not authorized" });
  jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({err: "User is not authorized"})
    }
    req.user = user;
    next();
  });
}
  
router.post("/", authenticateToken, (req, res) => {
  const findbyid = "SELECT username,email FROM Credentials WHERE id=?;";
  db.query(findbyid, [req.body.id], (err, data) => {
    if (err) console.log(err);
    res.send({ data: data });
  });
});

module.exports = router