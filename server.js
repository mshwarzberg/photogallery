const express = require("express");
const cors = require("cors");
const app = express();
const register = require("./routes/accounts/createaccount");
const login = require("./routes/accounts/login");
const profile = require("./routes/accounts/profile");
const upload = require("./routes/gallery/upload");
const viewphotos = require("./routes/gallery/viewphotos");
const managephotos = require('./routes/gallery/managephotos')
// for troubleshooting purposes only
const magicalbutton = require('./routes/magical')

const db = require("./config/mysql");

app.use(cors())
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to MYSQL Server");
});

app.listen(5000, () => {
  console.log("Now listening on port 5000");
});

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/upload", upload);
app.use("/api/gallery", viewphotos);
app.use('/api/magical', magicalbutton)
app.use('/api/manage', managephotos)