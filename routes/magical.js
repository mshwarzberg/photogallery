const express = require("express");
const router = express.Router();
const db = require("../config/mysql");
const fs = require("fs");

// for dev purposes only. Used to delete stuff the db and filesystem (for a user) !!!
router.post("/", async (req, res) => {
  const foundFiles = await fs.promises.readdir(`./images/${req.body.id}/`, (err, result) => {
    if (err) console.log(err);
    console.log("found files");
  });
  console.log(foundFiles.length);
  const deleteAll = 'DELETE FROM images'
  db.query(deleteAll, [req.body.id], (err, data) => {
    if (err) console.log(err);
    console.log('deleted everything from db');
  })
  for (let i = 0; i < foundFiles.length; i++) {
    fs.unlinkSync(`./images/${req.body.id}/${foundFiles[i]}`, (err, result) => {
      if (err) console.log(err);
      console.log(`deleted ${foundFiles[i]}`);
    })
  }
});
module.exports = router;
