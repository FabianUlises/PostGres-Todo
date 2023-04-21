// Dependencies
import React, { useState } from 'react';
// Components
import Modal from '../modal/Modal';
// import TickIcon from './../tickicon/TickIcon';
import Progressbar from './../progressbar/Progressbar';
// Styles
import styles from './listitem.css';
const ListItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const displayModal = () => {
    setShowModal(true);
  };
  console.log(props);
  return (
    <div className='list-item'>
      <div className='list-item__content'>
        <span>✔</span>
        <p className='item-title'>{props.todo.title}</p>
        <Progressbar />
      </div>
      <div className='list-item__button-container'>
        <button onClick={displayModal} className='edit-btn'>Edit</button>
        <button className='delete-btn'>Delete</button>
        {showModal && <Modal mode='edit' setShowModal={setShowModal} todo={props.todo} />}
      </div>
    </div>
  );
};

export default ListItem;