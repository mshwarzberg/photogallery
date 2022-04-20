const express = require("express");
const router = express.Router();

const db = require("../../config/mysql");

router.post("/", (req, res) => {

  const { category, id, currentindex, resetnumber} = req.body

  const imgIndex = 24 * resetnumber + (currentindex + resetnumber)

  const getImageData = `SELECT * FROM images WHERE id=? and isintrash=true ORDER BY nameinserver LIMIT 1${imgIndex > 0 ? ` OFFSET ?` : ``}`;

  db.query(getImageData, [id, imgIndex], (err, data) => {
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

        let path = `/images/${id}/${data[0].nameinserver}`

        if (category === 'isintrash') {
          path = `/images/${id}/trash/${data[0].nameinserver}`
        }

        return res.sendFile(
          path,
          options
        );
      }
      return res.send({ msg: "No more files" });
    }
  });
});

module.exports = router;
