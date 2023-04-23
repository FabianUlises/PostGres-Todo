// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
// Signup Route
app.post('/signup', async(req, res) => {
  // Getting email and password from request body
  const { email, password } = req.body;
  // Generating salt for password
  const salt = bcrypt.genSaltSync(10);
  // Hashing password
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(email, password);
  console.log(hashedPassword);
  try {
    // Saving user email and password to db
    const signUp = await pool.query(`INSERT INTO users (email, hashed_Password) VALUES($1, $2)`, [email, hashedPassword]);
    // Creating web token
    const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr' });
    res.json({ email, token });
  } catch(err) {
    if(err) {
      res.json({ details: err.detail })
    }
  }
});
// Login route
app.post('/login', async(req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if(!user.rows.length) return res.json({ details: "User doesn't exist!" });
    const success = await bcrypt.compare(password, user.rows[0].hashed_password);
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
    if(success) {
      res.json({ 'email': user.rows[0].email, token });
    } else {
      res.json({ details: 'Login failed' });
    }
  } catch(err) {
    console.log(err);
  }
});
// Server on
app.listen(process.env.PORT, () => 
  console.log(`server listeningn on port: ${process.env.PORT}`));