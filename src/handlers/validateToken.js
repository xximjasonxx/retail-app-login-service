

const _get = require('lodash/get');
const verifyToken = require('../helpers/jwt').verifyToken;
const getCacheKey = require('../helpers/redis').getKey;

module.exports = function(request, response) {
    const authorizationHeader = _get(request, 'headers.authorization', null);
    if (authorizationHeader === null) {
        response.status(400).json({ message: 'No Authorization Header present' });
    }
    else {
        getCacheKey(authorizationHeader)
            .then((secretyKey) => {
                if (secretyKey === null) {
                    return Promise.reject({ code: 401, message: 'This token is not valid - it may have expired' });
                }
                
                return verifyToken(authorizationHeader, secretyKey);
            })
            .then((verifyResult) => {
                if (!verifyResult.outcome) {
                    response.status(401).json({ message: 'This token is not valid' });
                }
                else {
                    response.status(200).json(verifyResult.payload);
                }
            })
            .catch((error) => {
                if (error.code) {
                    response.status(error.code).json({ message: error.message });
                }
                else {
                    response.status(500).json({ message: 'An error occured validating your token' });
                }
            });
    }
}