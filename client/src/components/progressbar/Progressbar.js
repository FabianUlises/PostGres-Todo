// Dependencies
import React from 'react';

const Progressbar = (props) => {
  return (
    <div className='outer-bar'>
      <div className='inner-bar' style={{ width: `${props.progress}%` }} ></div>
    </div>
  );
};

export default Progressbar;