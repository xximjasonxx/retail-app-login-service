
const express = require('express');
const handlers = require('./handlers');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

console.log('dbhost: ' + process.env.DB_HOST);

// add handlers
app.post('/api/login', handlers.performLogin);
app.post('/api/user', handlers.performCreate);
app.get('/api/validate', handlers.validateToken);

app.get('/api/users', handlers.getAllUsers);

// other routes
app.use(express.static('public', { index: 'login.html' }));

// setup listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log('startp complete');
});