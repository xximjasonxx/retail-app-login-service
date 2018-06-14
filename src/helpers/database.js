
const pgp = require('pg-promise')();
console.error(`connStr: postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/Users`);

const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/Users`);
exports.database = db;