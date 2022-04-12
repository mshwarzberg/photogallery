const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
var sizeOf = require("image-size");
const db = require("../../config/mysql");

let id;

const generateImageID = (length = 50) => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `images/${id}`);
  },
  filename: async function (req, file, cb) {
    if (id === undefined) {
      return
    }
    let newname;
    const files = await fs.promises.readdir(`images/${id}`);
    newname = files.length;
    for (let i = 0; i < files.length; i++) {
      const name = files[i].split(".")[0]
      if (name > i && name.length === i.length) {
        newname = i;
        break;
      }
    }
    cb(null, newname + "." + file.originalname.split(".").pop());
  },
});

const upload = multer({ storage: storage });

router.post("/getid", async (req, res) => {
  id = req.body.id;
  res.send(fs.existsSync(`./images/${req.body.id}`));
});

router.post("/", upload.single("image"), (req, res) => {
  const dimensions = sizeOf(`./images/${id}/${req.file.filename}`);
  console.log(req.file);
  const imageID = generateImageID();
  const addImageToDB =
    "INSERT INTO Images(imageid, id, originalname, nameinserver, filelocation, dimensions, filesize) VALUES(?,?,?,?,?,?,?);";
  db.query(
    addImageToDB,
    [imageID, id, req.file.originalname, req.file.filename, `/images/${id}/${req.file.filename}`, dimensions.width + "x" + dimensions.height, req.file.size],
    (err, data) => {
      if (err) console.log(err);
      res.send('Complete')
    }
  )
});

module.exports = router;
