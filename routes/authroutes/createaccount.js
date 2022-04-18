const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("../../config/mysql");
const bcrypt = require("bcrypt");
const router = express.Router();

function generateUUID(length = 100) {
  let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

router.post("/", async (req, res) => {
  const id = generateUUID();
  const salt = await bcrypt.genSalt();
  const hashedPass = bcrypt.hashSync(req.body.password, salt);
  const newuser =
    "INSERT INTO Credentials(id, username, email, userpass) VALUES(?,?,?,?)";
  db.query(
    newuser,
    [id, req.body.username, req.body.email, hashedPass],
    (err, data) => {
      if (err) {
        if (err.errno === 1062) {
          if (err.sqlMessage.includes("credentials.username")) {
            return res.status(409).send({ err: "Username taken" });
          }
          if (err.sqlMessage.includes("credentials.email")) {
            return res.status(409).send({ err: "Email taken" });
          }
          if (data === undefined) {
            return res.status(400).send({ err: "Invalid request" });
          }
        }
      } else {
        const newPath = `./images/${id}/trash`;
        fs.mkdirSync(newPath, { recursive: true });
        res
          .status(200)
          .send({ msg: "VJDx5R4z9z8kYTt7L5h2CQm35IFqURJLoKcVrCVwLS5BXwV3qy" });
      }
    }
  );
});

module.exports = router;
