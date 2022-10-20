import React, { useState } from 'react';

import Tooltip from '../Tooltip/Tooltip';
import Card from '../Card/Card';

import './Chart.css';

const Chart = ({ title, description, link, linkLabel }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className='chart-container'
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}>
        <Card>
          {title}
          { isShown && <Tooltip
              title={title}
              description={description}
              link={link}
              linkLabel={linkLabel}/>
          }
        </Card>
    </div>
  );
}

export default Chart;
