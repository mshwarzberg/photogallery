const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const db = require("../../config/mysql");
const sizeOf = require("image-size");
const ExifImage = require("exif").ExifImage;

let id;
const authandsecurity = require('../authandsecurity')

function addArrToDB(id, originalname, nameinserver, path, dimensions, size) {
  const imageID = generateImageID();
  const addImageToDB =
    "INSERT INTO Images(imageid, id, originalname, nameinserver, filelocation, dimensions, filesize) VALUES(?,?,?,?,?,?,?);";
  db.query(
    addImageToDB,
    [imageID, id, originalname, nameinserver, path, dimensions, size],
    (err, data) => {
      if (err) console.log(err);
    }
  );
}

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
      return;
    }
    const newname = generateImageID();
    cb(null, newname + "." + file.originalname.split(".").pop());
  },
});

const upload = multer({ storage: storage });

router.post("/getid", (req, res) => {
  id = req.body.id;
  res.send(fs.existsSync(`./images/${req.body.id}`));
});

router.post("/one", upload.single("image"), (req, res) => {
  console.log(req.file);
  let dimensions;
  const getDimensions = function getExif() {
    return new Promise((resolve, reject) => {
      new ExifImage({ image: `./images/${id}/${req.file.filename}` }, function (
        error,
        exifData
      ) {
        if (error) {
          reject(error);
        } else {
          if (exifData.image.Orientation > 4) {
            dimensions =
              exifData.image.ImageHeight + "x" + exifData.image.ImageWidth;
          } else if (
            exifData.image.Orientation < 4 &&
            exifData.image.ImageHeight &&
            exifData.image.ImageWidth
          ) {
            dimensions =
              exifData.image.ImageWidth + "x" + exifData.image.ImageHeight;
          }
          resolve(dimensions);
        }
      });
    });
  };

  getDimensions()
    .then((result) => {
      addArrToDB(
        id,
        req.file.originalname,
        req.file.filename,
        `/images/${id}/${req.file.filename}`,
        result,
        req.file.size
      );
    })
    .catch((err) => {
      sizeOf(`./images/${id}/${req.file.filename}`, (err, data) => {
        if (err) console.log(err);
        else {
          addArrToDB(
            id,
            req.file.originalname,
            req.file.filename,
            `/images/${id}/${req.file.filename}`,
            data.width + "x" + data.height,
            req.file.size
          );
        }
      });
    });
  res.send({ msg: "Complete" });
});

router.post("/multiple", upload.array("image", 100), async (req, res) => {
  for (let i = 0; i < req.files.length; i++) {
    let dimensions;
    const getDimensions = function getExif() {
      return new Promise((resolve, reject) => {
        new ExifImage(
          { image: `./images/${id}/${req.files[i].filename}` },
          function (error, exifData) {
            if (error) {
              reject(error);
            } else {
              if (!exifData.image.ImageHeight || !exifData.image.ImageWidth) {
                reject(error);
              }
              if (exifData.image.Orientation > 4) {
                dimensions =
                  exifData.image.ImageHeight + "x" + exifData.image.ImageWidth;
              } else if (
                exifData.image.Orientation < 4 &&
                exifData.image.ImageHeight &&
                exifData.image.ImageWidth
              ) {
                dimensions =
                  exifData.image.ImageWidth + "x" + exifData.image.ImageHeight;
              }
              resolve(dimensions);
            }
          }
        );
      });
    };

    getDimensions()
      .then((result) => {
        addArrToDB(
          id,
          req.files[i].originalname,
          req.files[i].filename,
          `/images/${id}/${req.files[i].filename}`,
          result,
          req.files[i].size
        );
      })
      .catch((err) => {
        sizeOf(`./images/${id}/${req.files[i].filename}`, (err, data) => {
          if (err) console.log(err);
          else {
            addArrToDB(
              id,
              req.files[i].originalname,
              req.files[i].filename,
              `/images/${id}/${req.files[i].filename}`,
              data.width + "x" + data.height,
              req.files[i].size
            );
          }
        });
      });
  }
  res.send({ msg: "Complete" });
});
module.exports = router;
