var mysql = require("mysql");
require("dotenv").config();

module.exports.stablishedConnection = () => {
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host: process.env.MYSQL_DB_HOST,
      user: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB,
      charset:'utf8mb4_bin'
    });
    con.connect((err) => {
      if (err) {
        reject(err);
      }
      resolve(con);
    });
  });
};

module.exports.closeDbConnection = (con) => {
  con.destroy();
};