const express = require("express");
const router = express.Router();
const db = require('../config/mysql')

const jwt = require("jsonwebtoken");

module.exports = {
  logout: router.use((req, res) => {
      const removeRefreshToken = 'UPDATE credentials SET refreshtoken=null WHERE id=?'
      db.query(removeRefreshToken, [req.body.id], (err, data) => {
        if (err) return console.log(err);
       return res.send({res: "RHKp946ZyBp2g6XNj45BKn7tF58syiFVvCx3wSdONwT6J4IdJU"})
      })
  }),

  authenticateToken: router.use((req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(401).send({ err: "User is not authorized" });
    jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ err: "Forbidden" });
      }
      else {
        req.user = user;
        next();
      }
    });
  }),

  newAccessToken: router.use((req, res, next) => {

    let currentDateTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;

    const { authorization } = req.headers
    if (!authorization) return res.status(401).send({err: "User is not authorized"})
    const getRefreshFromDB = 'SELECT refreshtoken FROM credentials WHERE id=?'
    db.query(getRefreshFromDB, [req.body.id], (err, data) => {
      if (err) return console.log(err);
      else {
        jwt.verify(authorization, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: currentDateTime,
        }, (err, user) => {
          if (err) return res.status(403).send({err: "Forbidden"})
          else {
            const accessToken = 'GFD'
          }
        });
      }
    })
    
    
    next()
  }),
};
