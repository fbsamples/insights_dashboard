import React, { useState, useRef } from 'react';

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import styles from './style.module.css';

const Tooltip = ({ info }) => {
  const ref = useRef();
  const [increased, setIncreased] = useState(false);

  const updateTooltipSize = () => {
    if (increased) {
      ref.current.style.maxHeight = '100px';
    } else {
      ref.current.style.maxHeight = 'fit-content';
    }

    setIncreased(!increased);
  }

  return <div className={styles.tooltip}>
    <div className={styles.textContainer} ref={ref}>
      { info.map((info) => {
          return <div key={info.id}>
              <h1 className={styles.title}>{info.title}</h1>
              <p className={styles.metricName}>({info.name})</p>
              <p className={styles.description}>{info.description}</p>
            </div>;
          })
      }
      { info.length > 2 && <button className={styles.btn} onClick={updateTooltipSize}>{ increased ? <AiOutlineMinus/> : <AiOutlinePlus/> }</button> }
    </div>
  </div>;
}

export default Tooltip;
