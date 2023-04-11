// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// Postgres db connection
const pool = require('./db');
// Middleware
app.use(cors());
// Routes
app.get('/todos/:userEmail', async(req, res) => {
    const { userEmail } = req.params;
    console.log(req);
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        res.json(todos.rows);
    }catch(err) {
        console.log(err);
    }
});
// Server on
app.listen(process.env.PORT,() => console.log('server on'));