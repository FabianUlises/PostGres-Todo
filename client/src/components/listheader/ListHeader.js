// Dependencies
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
// Components
import Modal from '../modal/Modal';
// Styles
import styles from './listheader.css';
const ListHeader = (props) => {
  // Cookies
  const [cookies, setCookie, removeCookie] = useCookies(null);
  // State
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState();
  // Function to handle signout button
  const signOut = () => {
    // Removing cookies & logging out
    removeCookie('Email');
    removeCookie('AuthToken');
    // Refreshing page to kick user out
    window.location.reload();
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
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={props.getData} />}
    </div>
  );
};

export default ListHeader;