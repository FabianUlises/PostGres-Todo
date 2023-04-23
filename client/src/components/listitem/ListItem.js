// Dependencies
import React, { useState } from 'react';
// Components
import Modal from '../modal/Modal';
// import TickIcon from './../tickicon/TickIcon';
import Progressbar from './../progressbar/Progressbar';
// Styles
import styles from './listitem.css';
const ListItem = (props) => {
  // State
  const [showModal, setShowModal] = useState(false);
  // Function to toggle modal display
  const displayModal = () => {
    // Updating state
    setShowModal(true);
  };
  // Function to delete task from db
  const deleteTodo = async() => {
    try {
      // Makig fetch request to delete task from db
      const res = await fetch(`${process.env.REACT_APP_SERVER}/todos/${props.todo.id}`, {
        method: "DELETE"
      });
      if(res.status === 200) {
        // Running function to get data from db and render on page
        props.getData();
      };
    } catch(err) {
      console.log(err);
    }
  };
  return (
    <div className='list-item'>
      <div className='list-item__content'>
        <span>✔</span>
        <p className='item-title'>{props.todo.title}</p>
        <Progressbar progress={props.todo.progress} />
      </div>
      <div className='list-item__button-container'>
        <button onClick={displayModal} className='edit-btn'>Edit</button>
        <button onClick={deleteTodo} className='delete-btn'>Delete</button>
        {showModal && <Modal mode='edit' setShowModal={setShowModal} todo={props.todo} getData={props.getData} />}
      </div>
    </div>
  );
};

export default ListItem;