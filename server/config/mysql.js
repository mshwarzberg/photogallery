const mysql = require("mysql");

var config = mysql.createConnection({
  port: 4000,
  host: "localhost",
  user: "root",
  password: "password",
  // add after creating database below
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
    `CREATE TABLE IF NOT EXISTS Credentials(id VARCHAR(255) PRIMARY KEY UNIQUE, username VARCHAR(255) NOT NULL UNIQUE, email VARCHAR(255) NOT NULL UNIQUE,userpass VARCHAR(255) NOT NULL);`
  config.query(createCredentialTable, (err, res) => {
    if (err) console.log(err);
    console.log(res);
  });
  const createImagesTable =
    `CREATE TABLE IF NOT EXISTS Images(imageid VARCHAR(255) NOT NULL PRIMARY KEY,id VARCHAR(255)NOT NULL, FOREIGN KEY (id) REFERENCES Credentials(id), originalname VARCHAR(255) NOT NULL, nameinserver VARCHAR(255) NOT NULL);`
  config.query(createImagesTable, (err, res) => {
    if (err) console.log(err);
    console.log(res);
  });
  const createImageDataTable =
    `CREATE TABLE IF NOT EXISTS ImageData(imageid VARCHAR(255) NOT NULL, FOREIGN KEY (imageid) REFERENCES Images(imageid),dimensions VARCHAR(255),filesize INT);`
  config.query(createImageDataTable, (err, res) => {
    if (err) console.log(err);
    console.log(res);
  })
}

// initialSetup()

module.exports = config;
