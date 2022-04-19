const express = require("express");
const router = express.Router();
const db = require("../config/mysql");

const jwt = require("jsonwebtoken");

module.exports = {
  logout: router.use((req, res) => {
    console.log('loggingout');
    if (req.body.loggingout) {
      const removeRefreshToken =
      "UPDATE credentials SET refreshtoken=null WHERE id=?";
      db.query(removeRefreshToken, [req.body.id], (err, data) => {
        if (err) return console.log(err);
        return res.send({
          res: "RHKp946ZyBp2g6XNj45BKn7tF58syiFVvCx3wSdONwT6J4IdJU",
        });
      });
    }
  }),
  
  middlewareAuthentication: (req, res, next) => {
    console.log('checking token');
    if (req.body.checkingtoken) {
      const { authorization, checkingtoken } = req.headers;
      if (!authorization) {
        return res.status(401).send({ err: "User is not authorized" });
      }
      jwt.verify(
        authorization,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            return res.status(403).send({ err: "Forbidden" });
          } else {
            req.user = user;
              return res.send({ msg: "Authorized" });
          }
        }
        );
        next();
      }
    },
    
    newAccessToken: (req, res, next) => {
      console.log('refreshing token');
      if (req.body.refreshingtoken) {
        let tenMinutes = Math.floor(Date.now() / 1000) + 10 * 60;
        
        const { authorization } = req.headers;
        
        if (!authorization)
        return res.status(401).send({ err: "User is not authorized" });
        const getRefreshFromDB =
        "SELECT refreshtoken, email, username, id FROM credentials WHERE id=?";
      db.query(getRefreshFromDB, [req.body.id], (err, data) => {
        if (err) return console.log(err);
        else {
          const userInfo = {
            username: data[0].username,
            email: data[0].email,
            id: data[0].id,
          };

          jwt.verify(
            data[0].refreshtoken,
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
  },
};
