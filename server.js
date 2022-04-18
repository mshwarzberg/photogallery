const express = require("express");
const cors = require("cors");
const app = express();
const register = require("./routes/authroutes/createaccount");
const login = require("./routes/authroutes/login");
const profile = require("./routes/authroutes/profile");
const upload = require("./routes/galleryroutes/upload");
const viewphotos = require("./routes/galleryroutes/viewphotos");
const managephotos = require("./routes/galleryroutes/managephotos");

const db = require("./config/mysql");

app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to MYSQL Server");
});

app.listen(5000, () => {
  console.log("5000");
});

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/upload", upload);
app.use("/api/gallery", viewphotos);
app.use("/api/manage", managephotos);
