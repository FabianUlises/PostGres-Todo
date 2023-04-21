// Dependencies
import React, { useState } from 'react';
// Styles
import styles from './modal.css';
const Modal = () => {
  const mode = 'create';
  const editMode = mode === 'edit' ? true : false;
  // State
  const [input, setInput] = useState('');
  const [data, setData] = useState({
    user_email: '',
    title: '',
    progress: ''
  });
  // Function to handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput(e.target.value);
    setData({
      ...data,
      [name]: value
    });
  };
  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='modal__content'>
          <h3>{mode} your task</h3>
          <button type='button'>X</button>
        </div>
        <form className='modal__form'>
          <input onChange={handleInput} required maxLength={30} placeholder='your task goes here' name='title' value={data.title} />
          <label for='range'>Progress</label>
          <input id='range' onChange={handleInput} required type='range' min='0' max='100' name='progress' value={data.progress} />
          <button className={`form-${mode}-btn`} type='submit'>{mode}</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;