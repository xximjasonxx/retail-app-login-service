
const getByUsername = require('../helpers/user').getByUsername;
const generateToken = require('../helpers/jwt').generateToken;
const cacheToken = require('../helpers/jwt').cacheToken;
const validateLogin = require('../helpers/user').validateLogin;

module.exports = function(request, response) {
    const username = request.body.username;
    const password = request.body.password;

    // need to get the potential user
    getByUsername(username)
        .then((user) => {
            if (user === null) {
                return Promise.reject({ code: 401, message: 'The provided user does not exist' });
            }
            else {
                return validateLogin(password, user.salt, user.password)
                    .then((isValid) => {
                        if (!isValid) {
                            return Promise.reject({ code: 401, message: 'Authentication Failed' });
                        }

                        const tokenInfo = generateToken(user);
                        cacheToken(tokenInfo);
                        return Promise.resolve({ token: tokenInfo.token, userData: user });
                    });
            }
        })
        .then((loginResult) => {
            response.status(200).json(loginResult);
        })
        .catch((error) => {
            if (error.code) {
                response.status(error.code).json({ message: error.message });
            }
            else {
                console.log(error);
                response.status(500).json(error);
            }
        });
}