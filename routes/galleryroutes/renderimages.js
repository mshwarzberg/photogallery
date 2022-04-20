const express = require("express");
const router = express.Router();

const db = require("../../config/mysql");

router.post("/", (req, res) => {
  const imgIndex = 24 * req.body.resetnumber + (req.body.currentindex + req.body.resetnumber)
  
  const getImageData = `SELECT * FROM images WHERE id=? and isintrash=false ORDER BY nameinserver LIMIT 1${imgIndex > 0 ? ` OFFSET ?` : ``}`;

  db.query(getImageData, [req.body.id, imgIndex], (err, data) => {
    if (err) console.log(err);
    else {
      if (data[0]) {
        const options = {
          root: "./",
          headers: {
            nameinserver: data[0].nameinserver,
            originalname: data[0].originalname,
            filesize: data[0].filesize,
            dimensions: data[0].dimensions,
          },
        };
        return res.sendFile(
          `/images/${req.body.id}/${data[0].nameinserver}`,
          options
        );
      }
      return res.send({ msg: "No more files" });
    }
  });
});

module.exports = router;
