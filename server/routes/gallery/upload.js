const express = require("express");
const router = express.Router();
const multer = require("multer");
const { promises: fs } = require("fs");
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
    let newname;
    const files = await fs.readdir(`images/${id}`);
    
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

router.post("/getid", (req, res) => {
  if (req.body.id) {
    return (id = req.body.id);
  }
  res.send("damn you");
});

router.post("/", upload.single("image"), async (req, res) => {
  const dimensions = sizeOf(`./images/${id}/${req.file.filename}`);
  const imageID = generateImageID();

  const addImageToDB =
    "INSERT INTO Images(imageid, id, originalname, nameinserver) VALUES(?,?,?,?);";
  db.query(
    addImageToDB,
    [imageID, id, req.file.originalname, req.file.filename],
    (err, data) => {
      if (err) console.log(err);
    }
  );
  const addImageDataToDB =
    "INSERT INTO ImageData(imageid, dimensions, filesize) VALUES(?,?,?)";
  db.query(
    addImageDataToDB,
    [imageID, dimensions.width + "x" + dimensions.height, req.file.size],
    (err, data) => {
      if (err) console.log(err);
    }
  );
});

module.exports = router;
