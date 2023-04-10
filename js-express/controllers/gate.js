//Untuk kumpulan fuction query database
const { stablishedConnection, closeDbConnection } = require('../api/db-connection');

const showAll = async (request, response) => {
  stablishedConnection()
    .then((db) => {
      db.query(`SELECT * FROM kartu_akses`, null, function (err, data) {
        if (!data) {
          //   var responseReturn = new ResponseClass(true, 200, err);
          response.status(200).json(err);
        } else {
          //   var responseReturn = new ResponseClass(true, 200, 'Success', data);
          response.status(200).json(data);
          closeDbConnection(db);
        }
      });
    })
    .catch((error) => {
      //   var responseReturn = new ResponseClass(true, 501, error);
      response.status(200).json(error);
    });
};
module.exports = {
  showAll,
};
