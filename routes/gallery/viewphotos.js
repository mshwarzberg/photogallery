const express = require("express");
const router = express.Router();

const db = require("../../config/mysql");

let id;
let reqNum;

router.post("/getid", (req, res) => {
  id = req.body.id;
  reqNum = req.body.reqNum;
  const getImages =
    "SELECT imageid,originalname,nameinserver,dimensions, filesize from images WHERE id=? ORDER BY nameinserver DESC;";
  db.query(getImages, [id], (err, data) => {
    if (err) console.log(err);
    for (let i = 0; i <= data.length; i++) {
        if (i === reqNum && data[reqNum]) {
          res.send({
            imageid: data[i].imageid,
            name: data[i].originalname,
            servername: data[i].nameinserver,
            dimensions: data[i].dimensions,
            filesize: data[i].filesize,
          });
        }
    }
    res.end();
  });
});

router.get("/", (req, res) => {
  const getImages =
    "SELECT nameinserver from images WHERE id=? ORDER BY nameinserver DESC;";
  db.query(getImages, [id], (err, data) => {
    if (err) console.log(err);
    for (let i = 0; i <= data.length; i++) {
      if (i === reqNum && data[reqNum]) {
        res.sendFile(`/images/${id}/${data[reqNum].nameinserver}`, {
          root: "./",
        });
      }
    }
  });
});

module.exports = router;
