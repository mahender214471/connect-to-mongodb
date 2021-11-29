/*
//=====================> ABOUT FILE <==========================//
MOTIVE - ENTRY FILE ON CONNECT-TO-MONGODB MODULE  ;
WRITER - MAHENDER RAJPUT ;
*/
const database = require('./mongodb');
const mongoDB = (rootDir , mongoPath) => {
      const mongoDB = new database(rootDir , mongoPath);
      return mongoDB;
}
module.exports = mongoDB ;