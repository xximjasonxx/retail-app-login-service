
const _get = require('lodash/get');
const getAllUsers = require('../helpers/user').getAllUsers;

module.exports = function(request, response) {
    const authorizationHeader = _get(request, 'headers.authorization', null);
    if (authorizationHeader === null) {
        response.status(400).json({ message: 'No Authorization token supplied' });
    }

    getAllUsers()
        .then((results) => {
            response.status(200).json(results);
        })
        .catch((error) => {
            console.log(error);
            response.status(500);
        });
}