// Dependencies
import React from 'react';
// Styles
import styles from './listheader.css';
const ListHeader = (props) => {
  // Function to handle signout button
  const signOut = () => {
    console.log('signout');
  };
  return (
    <div className='list-header'>
      <h1>{props.title}</h1>
      <div className='button-container'>
        <button className='create-btn' type='button'>Add New</button>
        <button onClick={signOut} className='signout-btn' type='button'>Sign Out</button>
      </div>
    </div>
  );
};

export default ListHeader;