// Dependencies
import React from 'react';
// Components
import TickIcon from './../tickicon/TickIcon';
import Progressbar from './../progressbar/Progressbar';
// Styles
import styles from './listitem.css';
const ListItem = (props) => {
  return (
    <div className='list-item'>
      <div className='list-item__content'>
        <TickIcon />
        <p className='item-title'>{props.title}</p>
        <Progressbar />
      </div>
      <div className='list-item__button-container'>
        <button className='edit-btn'>Edit</button>
        <button className='delete-btn'>Delete</button>
      </div>
    </div>
  );
};

export default ListItem;