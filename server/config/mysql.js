const mysql = require("mysql");

const config = mysql.createConnection({
  port: 4000,
  host: "localhost",
  user: "root",
  password: "password",
  // add after creating database below
  database: "photogallery",
});

// run before adding "database: 'photogallery'" to the config
function setup() {
  const newdb = "CREATE DATABASE IF NOT EXISTS photogallery";
  config.query(newdb, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
  const createCredentialTable =
    "CREATE TABLE IF NOT EXISTS Credentials(id VARCHAR(255) PRIMARY KEY UNIQUE, username VARCHAR(255) NOT NULL UNIQUE, email VARCHAR(255) NOT NULL UNIQUE,userpass VARCHAR(255) NOT NULL);";
  config.query(createCredentialTable, (err, res) => {
    if (err) console.log(err);
    console.log(res);
  });
}

setup();

module.exports = config;
