// Dependencies
import React, { useState } from 'react';
// Styles
import styles from './modal.css';
const Modal = (props) => {
  const editMode = props.mode === 'edit' ? true : false;
  // State
  const [input, setInput] = useState('');
  const [data, setData] = useState({
    user_email: editMode ? props.todo.user_email : 'user@test.com' ,
    title: editMode ? props.todo.title : null,
    progress: editMode ? props.todo.progress :  50
  });
  // Function to post data to db
  const postData = async (e) => {
    e.preventDefault();
    console.log('button clicked');
    try {
      const res = await fetch('http://localhost:4001/todos', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if(res.status === 200) {
        console.log('post submitted');
        props.setShowModal(false);
        props.getData();
      }
    } catch(err) {
      console.log(err);
    }
  }
  // Function to handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput(e.target.value);
    setData({
      ...data,
      [name]: value
    });
  };
  // Function to close modal
  const closeModal = () => {
    props.setShowModal(false);
  };
  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='modal__content'>
          <h3>{props.mode} your task</h3>
          <button onClick={closeModal} type='button'>X</button>
        </div>
        <form className='modal__form'>
          <input onChange={handleInput} required maxLength={30} placeholder='your task goes here' name='title' value={data.title} />
          <label for='range'>Progress</label>
          <input id='range' onChange={handleInput} required type='range' min='0' max='100' name='progress' value={data.progress} />
          <button onClick={editMode ? '' : postData} className={`form-${props.mode}-btn`} type='submit'>{props.mode}</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;