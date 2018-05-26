
const pgp = require('pg-promise')();

const db = pgp(process.env.CONNECTION_STRING);
exports.database = db;