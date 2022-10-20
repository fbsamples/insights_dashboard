import React from 'react';

import './Section.css';

const Section = (props) => {
  return <div className='section'>
    <h1 className='title'>{props.title}</h1>
    {props.children}
  </div>;
}

export default Section;
