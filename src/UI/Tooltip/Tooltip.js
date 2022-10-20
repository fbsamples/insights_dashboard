import React from 'react';
import './Tooltip.css';

const Tooltip = ({title, description, link, linkLabel}) => {
  const altLinkLabel = 'Click here to learn more.'

  return <div className='tooltip-container'>
    <h1>{title}</h1>
    <p>
      {description} &nbsp;
      <a className='tooltip-link' href={link}>{linkLabel ?? altLinkLabel}</a>
    </p>
  </div>;
}

export default Tooltip;
