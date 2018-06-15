
const createUser = require('../helpers/user').createUser;
const getByUsername = require('../helpers/user').getByUsername;

module.exports = function(request, response) {
    console.log('request received');
    const username = request.body.username;
    getByUsername(username)
        .then((user) => {
            if (user != null) {
                return Promise.reject({ code: 409, message: 'Username already exists' });
            }

            console.log('creating user');
            return createUser(request.body);
        })
        .then(() => {
            response.status(201).end();
        })
        .catch((error) => {
            console.log(error);
            if (error.code) {
                response.status(error.code).json({ message: error.message }).end();
            }
            else {
                response.status(500).json(error);
            }
        });
}