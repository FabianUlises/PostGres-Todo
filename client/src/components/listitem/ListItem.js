// Dependencies
import React from 'react';
// Styles
import styles from './listitem.css';
const ListItem = (props) => {
  return (
    <div className='list-item'>
      {props.title}
    </div>
  );
};

export default ListItem;