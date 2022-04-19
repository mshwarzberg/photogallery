const express = require("express");
const router = express.Router();

const db = require("../../config/mysql");

router.post("/", (req, res) => {
  
  const getImageData = "SELECT * FROM images WHERE id=? and isintrash=false";
  
  db.query(getImageData, [req.body.id], (err, data) => {
    if (err) console.log(err);
    
    for (let i = 0; i < data.length; i++) {
      const options = {
        root: './',
        headers: {
          nameinserver: data[i].nameinserver,
          originalname: data[i].originalname,
          filesize: data[i].filesize,
          dimensions: data[i].dimensions,
          value: req.body.currentindex,
          filestoload: data.length
        }
      }
      if (i === req.body.currentindex){
      return res.sendFile(`/images/${req.body.id}/${data[i].nameinserver}`, options);}
    }
    return res.send({ msg: "No more files" });
  });
});

module.exports = router;
