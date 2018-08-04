// require pg-promise
const pgp = require('pg-promise')();

// require obj, connect to db
// check export properties
const config = require('./dbConfig');

// pass to pgp to connect to db
const db = pgp(process.env.DATABASE_URL || config);

// confirm configuration
console.log(db);

module.exports = db;