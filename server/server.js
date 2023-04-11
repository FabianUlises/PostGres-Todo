// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
// Routes
app.get('/', (req, res) => {
    res.send('/ root stub route');
});
// Server on
app.listen(process.env.PORT,() => console.log('server on'));