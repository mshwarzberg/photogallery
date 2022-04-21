const mysql = require("mysql");

var config = mysql.createConnection({
  port: 6000,
  host: "localhost",
  user: "root",
  password: "password",
  // add database line after creating database below
  database: "photogallery",
});

// run before adding "database: 'photogallery'" to the config
function initialSetup() {
  const newdb = "CREATE DATABASE IF NOT EXISTS photogallery";
  config.query(newdb, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
  const createCredentialTable =
    "CREATE TABLE IF NOT EXISTS Credentials(id VARCHAR(255) PRIMARY KEY UNIQUE, username VARCHAR(255) NOT NULL UNIQUE, email VARCHAR(255) NOT NULL UNIQUE,userpass VARCHAR(255) NOT NULL, refreshtoken TEXT;"
  config.query(createCredentialTable, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
  const createImagesTable =
    "CREATE TABLE IF NOT EXISTS Images(id VARCHAR(255)NOT NULL, FOREIGN KEY (id) REFERENCES Credentials(id), originalname VARCHAR(255) NOT NULL, nameinserver VARCHAR(255) NOT NULL PRIMARY KEY, dimensions VARCHAR(255), filesize INT, filelocation VARCHAR(255) NOT NULL, isintrash BOOLEAN NOT NULL DEFAULT false, isinfavorites BOOLEAN NOT NULL DEFAULT false);"
  config.query(createImagesTable, (err, result) => {
    if (err) console.log('err');
    console.log(result);
  })
}

// initialSetup()

module.exports = config;
