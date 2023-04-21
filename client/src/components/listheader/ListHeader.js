// Dependencies
import React, { useState } from 'react';
// Components
import Modal from '../modal/Modal';
// Styles
import styles from './listheader.css';
const ListHeader = (props) => {
  // State
  const [showModal, setShowModal] = useState(true);
  const [mode, setMode] = useState();
  // Function to handle signout button
  const signOut = () => {
    console.log('signout');
  };
  // Function to show modal
  const displayModal = () => {
    setShowModal(true);
  };
  return (
    <div className='list-header'>
      <h1 className='list-header__title'>{props.title}</h1>
      <div className='button-container'>
        <button onClick={displayModal} className='create-btn' type='button'>Add New</button>
        <button onClick={signOut} className='signout-btn' type='button'>Sign Out</button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} />}
    </div>
  );
};

export default ListHeader;