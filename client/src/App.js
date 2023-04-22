// Dependencies
import React, { useState, useEffect } from 'react';
// Components
import ListHeader from './components/listheader/ListHeader';
import ListItem from './components/listitem/ListItem';
function App() {
  // State
  const [todos, setTodos] = useState(null);
  // User email
  const userEmail = 'user@test.com';
  // Fetching data from backend
  const getData = async() => {
    try {
      // Fetching data
      const res = await fetch(`http://localhost:4001/todos/${userEmail}`);
      const data = await res.json();
      // Updating state with data from back end
      setTodos(data);
    }catch(err) {
      console.log(err);
    }
  }
  // Useeffect
  useEffect(() => {
    // Fetching data
    getData();
  }, []);
  // Display todos on dom if there is todos else rendering 'loading todos'
  const displayTodos = !todos ? <p>loading todos...</p> : todos.map((todo) => (
    <ListItem todo={todo} key={todo.id} getData={getData} />
  ));
  return (
    <div className="App">
      <ListHeader title='📃 Current Tasks' getData={getData} />
      {displayTodos}
    </div>
  );
}

export default App;