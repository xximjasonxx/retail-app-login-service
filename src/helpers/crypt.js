
const bcrypt = require('bcrypt');

const genSalt = (iterations) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(iterations, (err, salt) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(salt);
            }
        });
    });
};

const hash = (plainPassword, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainPassword, salt, (err, hashResult) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(hashResult);
            }
        });
    });
}

exports.hash = (plainPassword, salt) => {
    return hash(plainPassword, salt);
}

exports.hashPassword = function(plainPassword) {
    return genSalt(10)
        .then((salt) => {
            return hash(plainPassword, salt)
                .then((hashedPassword) => {
                    return { salt, hashedPassword };
                });
        });
}