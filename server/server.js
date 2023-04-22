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
});
// Update task from db
app.put('/todos/:id', async(req, res) => {
  // Getting id from request params
  const { id } = req.params;
  console.log(req.body);
  // Getting task info from request body
  const { user_email, title, progress } = req.body;
  try {
    // Updating task
    const updatedTodo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3 WHERE id = $4;', [user_email, title, progress, id]);
    res.json(updatedTodo);
  } catch(err) {
    console.log('Error', err);
  }
});
app.delete('/todos/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await pool.query('DELETE FROM todos WHERE id = $1;', [id]);
    res.json(deletedTodo);
  }catch(err) {
    console.log(err);
  }
});
// Server on
app.listen(process.env.PORT, () => 
  console.log(`server listeningn on port: ${process.env.PORT}`));