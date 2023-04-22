// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
// Postgres db connection
const pool = require('./db');
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.get('/todos/:userEmail', async(req, res) => {
    const { userEmail } = req.params;
    console.log(userEmail);
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        res.json(todos.rows);
    }catch(err) {
        console.error(err);
    }
});
app.post('/todos', async(req, res) => {
    const { user_email, title, progress } = req.body
    const id = uuidv4()
    try {
      const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress) VALUES($1, $2, $3, $4)`,
        [id, user_email, title, progress])
      res.json(newToDo);
    } catch (err) {
      console.error(err)
    }
  })
// Server on
app.listen(process.env.PORT,() => console.log('server on'));