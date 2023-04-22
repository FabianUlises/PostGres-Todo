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
// Get data from db using user email
app.get('/todos/:userEmail', async(req, res) => {
    // Getting email parameter from request
    const { userEmail } = req.params;
    try {
        // Getting data from db using email
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        // Sending back data
        res.json(todos.rows);
    }catch(err) {
        console.error(err);
    }
});
// Post task to db
app.post('/todos', async(req, res) => {
    // Getting email title and progress from body request to post as task on db
    const { user_email, title, progress } = req.body
    // Creating unique id for task
    const id = uuidv4()
    try {
      // Inserting new task to db
      const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress) VALUES($1, $2, $3, $4)`,
        [id, user_email, title, progress])
      // Sending back data
      res.json(newToDo);
    } catch (err) {
      console.error(err)
    }
  })
// Server on
app.listen(process.env.PORT, () => 
  console.log(`server listeningn on port: ${process.env.PORT}`));