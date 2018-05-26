const path = require('path');

module.exports = {
    // api only handler
    performLogin: require('./performLogin'),
    performCreate: require('./performCreate'),
    validateToken: require('./validateToken'),
    getAllUsers: require('./getAllUsers')
};