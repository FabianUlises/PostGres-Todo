// Dependencies
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
// Components
import ListHeader from './components/listheader/ListHeader';
import ListItem from './components/listitem/ListItem';
import Auth from './components/auth/Auth';
function App() {
  // Cookies
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  // State
  const [todos, setTodos] = useState(null);
  // Fetching data from backend
  const getData = async() => {
    try {
      console.log(process.env.PORT);
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
    if(authToken) {
      // Fetching data
      getData();
    }
  }, []);
  // Display todos on dom if there is todos else rendering 'loading todos'
  const displayTodos = !todos ? <p>loading todos...</p> : todos.map((todo) => (
    <ListItem todo={todo} key={todo.id} getData={getData} />
  ));
  return (
    <div className="App">
      {!authToken && <Auth />}
      {authToken &&
        <>
          <ListHeader title='📃 Current Tasks' getData={getData} />
          <p className='user-email'>Welcome back {userEmail}</p>
          {displayTodos}
        </>
      }
    </div>
  );
}

export default App;