const express = require("express");
const router = express.Router();
const db = require("../config/mysql");

const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn:  '15s'});
}

function logOut(req, res) {
    const removeRefreshToken =
      "UPDATE credentials SET refreshtoken=null WHERE id=?";
    db.query(removeRefreshToken, [req.body.id], (err, data) => {
      if (err) return console.log(err);
      return res.send({
        res: "RHKp946ZyBp2g6XNj45BKn7tF58syiFVvCx3wSdONwT6J4IdJU",
      });
    });
}

function tokenAuthentication(req, res, next) {
  const { authorization, checkingtoken } = req.headers;
  if (!authorization) {
    return res.status(401).send({ err: "User is not authorized" });
  }
  jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ err: "Forbidden" });
    } else {
      req.user = user;
      return res.send({ msg: "Authorized" });
    }
  });
  next();
}

function newAccessToken(req, res, next) {

    let tenMinutes = Math.floor(Date.now() / 1000) + 10 * 60;
    
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(401).send({ err: "User is not authorized" });
    const getRefreshFromDB =
      "SELECT refreshtoken, email, username, id FROM credentials WHERE id=? and refreshtoken=?";
    db.query(getRefreshFromDB, [req.body.id, authorization], (err, data) => {
      if (err) return console.log(err);
      else {
        const userInfo = {
          username: data[0].username,
          email: data[0].email,
          id: data[0].id,
        };
        jwt.verify(
          authorization,
          process.env.REFRESH_TOKEN_SECRET,
          (err) => {
            if (err) return res.status(403).send({ err: "Forbidden" });
            else {
              const accessToken = jwt.sign(
                userInfo,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: tenMinutes }
              );
              return res.send({ data: accessToken });
            }
          }
        );
      }
    });
    next();
  }

module.exports = {
  generateAccessToken,
  logOut,
  tokenAuthentication,
  newAccessToken,
};
