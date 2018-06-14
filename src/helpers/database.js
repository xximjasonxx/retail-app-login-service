
const pgp = require('pg-promise')();

const buildPgConnectionString = () => {
    return `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/Users`;
};

const connectionString = buildPgConnectionString();
console.log(connectionString);

const db = pgp(connectionString);
exports.database = db;