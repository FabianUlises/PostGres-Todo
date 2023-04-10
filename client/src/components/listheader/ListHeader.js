// Dependencies
import React from 'react';
// Styles
import styles from './listheader.css';
const ListHeader = (props) => {
  return (
    <div className='list-header'>
      {props.title}
    </div>
  );
};

export default ListHeader;