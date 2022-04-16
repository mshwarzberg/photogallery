const express = require("express");
const router = express.Router();

const db = require("../../config/mysql");

let id;
let currentcalls;
let totalcalls

router.post("/getid", (req, res) => {
  id = req.body.id;
  currentcalls = req.body.currentcalls;
  totalcalls = req.body.totalcalls
  const getImages =
    `SELECT imageid,originalname,nameinserver,dimensions, filesize from images WHERE id=? ORDER BY filesize DESC LIMIT 25${totalcalls === 0 ? '': ', ?'};`
  db.query(getImages, [id, totalcalls*25], (err, data) => {
    if (err) console.log(err);
    for (let i = 0; i <= data.length; i++) {
      
      if (i === currentcalls && data[i]) {
          return res.send({
            imageid: data[i].imageid,
            name: data[i].originalname,
            servername: data[i].nameinserver,
            dimensions: data[i].dimensions,
            filesize: data[i].filesize,
          });
        }
    }
    return res.send({msg: 'No more files'});
  });
});

router.get("/", (req, res) => {
  const getImages =
    `SELECT nameinserver from images WHERE id=? ORDER BY filesize DESC LIMIT 25${totalcalls === 0 ? '': ', ?'};`
  db.query(getImages, [id, totalcalls*25], (err, data) => {
    if (err) console.log(err);
    for (let i = 0; i <= data.length; i++) {
      if (i === currentcalls && data[i]) {
        return res.sendFile(`/images/${id}/${data[currentcalls].nameinserver}`, {
          root: "./",
        });
      }
    }
    return res.send({msg:'No more files'})
  });
});

module.exports = router;
