
const uuid = require('uuid/v1');
const jwt = require('jsonwebtoken');
const setCacheKey = require('./redis').setKey;
const getCacheKey = require('./redis').getKey;

exports.generateToken = ({ firstname, lastname, username, role, userid }) => {
    const key = uuid();
    return {
        key,
        token: jwt.sign({
            firstname,
            lastname,
            username,
            userid,
            role
        }, key)
    };
}

exports.verifyToken = (token, key) => {
    return new Promise((resolve) => {
        jwt.verify(token, key, (err, decodedPayload) => {
            if (err) {
                resolve({ outcome: false });
            }
            else {
                resolve({
                    outcome: true,
                    payload: decodedPayload
                });
            }
        });
    })
}

exports.cacheToken = ({ key, token }) => {
    const expiration = 60 * 15 *60;
    setCacheKey(token, key, expiration);        // for dev: 15hr recycle
}

exports.findToken = (token) => {
    return getCacheKey(authorizationHeader)
        .then((cachedValue) => {
            return cachedValue;
        });
}