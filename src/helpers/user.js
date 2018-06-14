
const hash = require('./crypt').hash;
const hashPassword = require('./crypt').hashPassword;
const db = require('./database').database;
const uuid = require('uuid/v1');

exports.validateLogin = function(sourePassword, salt, storedPassword) {
    return hash(sourePassword, salt)
        .then((hashedResult) => {
            return hashedResult === storedPassword;
        });
}

exports.getByUsername = (username) => {
    const sql = 'SELECT * FROM Users where username = ${username} LIMIT 1';
    return db.oneOrNone(sql, { username });
}

exports.createUser = (newUserData) => {
    console.log('new user: ' + newUserData);
    return hashPassword(newUserData.password)
        .then(({ hashedPassword, salt }) => {
            const insertData = Object.assign({}, newUserData, {
                userId: uuid(),
                hashedPassword,
                salt
            });

            const sql = `INSERT INTO USERS VALUES(\${userId}, \${firstName}, \${lastName}, \${username}, \${hashedPassword}, \${salt}, \${role})`;
            return db.none(sql, insertData);
        });
}

exports.getAllUsers = () => {
    return db.query('SELECT * FROM Users')
        .then((results) => {
            return results.map(({ firstname, lastname, username, userid }) => {
                return {
                    firstname,
                    lastname,
                    username,
                    userid
                };
            });
        });
}