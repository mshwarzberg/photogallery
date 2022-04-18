const express = require("express");
const router = express.Router();
const db = require("../../config/mysql");

router.post("/getinfo", (req, res) => {
  const getData = "SELECT nameinserver,filesize FROM images where id=?";
  db.query(getData, [req.body.token], (err, data) => {
    if (err) console.log(err);
    let dataConsumed = 0;
    let amountofphotos = 0;
    for (let i = 0; i < data.length; i++) {
      amountofphotos += 1;
      dataConsumed += data[i].filesize;
    }

    const averagesize = dataConsumed / amountofphotos;
    res.send({
      dataConsumed: dataConsumed,
      amountofphotos: amountofphotos,
      averagesize: averagesize,
    });
  });
});

module.exports = router;
