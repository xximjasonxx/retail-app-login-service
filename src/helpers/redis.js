const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDIS_HOST
});

exports.setKey = (key, value, expirationInSeconds) => {
    client.set(key, value, 'EX', expirationInSeconds);
}

exports.getKey = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(reply);
            }
        });
    });
}