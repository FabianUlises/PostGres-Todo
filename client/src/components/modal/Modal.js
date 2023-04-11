// Dependencies
import React, { useState } from 'react';
// Styles
import styles from './modal.css';
const Modal = () => {
  // State
  const [input, setInput] = useState('');
  const mode = 'edit';
  // Function to handle input change
  const handleInput = (e) => {
    // setInput(e.target.value);
    console.log('handleinput')
  };
  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='modal__content'>
          <h3>Let's {mode} your task</h3>
          <button type='button'>X</button>
        </div>
        <form className='modal__form'>
          <input onChange={handleInput} required maxLength={30} placeholder='your task goes here' name='title' value={''} />
          <label for='range'>Progress</label>
          <input id='range' nChange={handleInput} required type='range' min={0} max={100} name='progress' value={''} />
          <button className={`form-${mode}-btn`} type='submit'>{mode}</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;