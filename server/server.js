// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
// Postgres db connection
const pool = require('./db');
// Routes
app.get('/', async(req, res) => {
    try {
        const todos = await pool.query('SELECT * FROM todos');
        res.json(todos.rows);
    }catch(err) {
        console.log(err);
    }
});
// Server on
app.listen(process.env.PORT,() => console.log('server on'));