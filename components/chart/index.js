import React, { useState } from 'react';

import Tooltip from '../tooltip';
import Card from '../card';

import styles from './style.module.css'

const Chart = ({ title, description, link, linkLabel }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className={styles.container}
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
