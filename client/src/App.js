// Dependencies
import React, { useEffect } from 'react';
// Components
import ListHeader from './components/listheader/ListHeader';
function App() {
  // Fetching data from backend
  const getData = async() => {
    const userEmail = 'user@test.com';
    try {
      const res = await fetch(`http://localhost:4001/todos/${userEmail}`);
      const data = await res.json();
      console.log(data);
    }catch(err) {
      console.log(err);
    }
  }
  // Useeffect
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <ListHeader title='📃 Current Tasks' />
    </div>
  );
}

export default App;