import React, { useEffect, useState } from 'react';
import Card from '../card';

import { AiFillCaretRight, AiOutlineComment, AiFillLike, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";

import styles from './style.module.css';
import settings from '../../constants/settings.json';

const ReelInsights = ({ reelId, apiName, metric, reelDescription }) => {
  const [metrics, setMetrics] = useState([]);

  const getInsights = async () => {
    try {
      const url = `${settings.backendUrl}/api/${apiName}`;
      const body = JSON.stringify({ metric, videoId: '1257196911793663' });
      const res = await fetch(url, { method: 'POST', body });
      const response = await res.json();

      console.log(response);
      if (response.data) {
        setMetrics(response.data);
      } else {
        setErrorMessage(error.message.substr(6));
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInsights();
  }, []);

  return <Card>
    <div className={styles.container}>

      <div className={styles.columnContainer}>
        <p className={styles.reelDescription}>{reelDescription}</p>
        <div className={styles.smallNumbersContainer}>
          <span className={styles.smallNumber}><AiOutlineComment className={styles.smallIcon}/>25</span>
          <span className={styles.smallNumber}><AiOutlineShareAlt className={styles.smallIcon}/>770</span>
          <span className={styles.smallNumber}><AiFillLike className={styles.smallIcon}/>290</span>
          <span className={styles.smallNumber}><AiFillHeart className={styles.smallIcon}/>450</span>
          <span className={styles.smallNumber}><AiFillCaretRight className={styles.smallIcon}/>1000</span>
        </div>
      </div>

      <div className={styles.columnContainer}>
        <span className={styles.bigNumber}>489s total</span>
        <span className={styles.mediumNumber}>12s average</span>
      </div>

    </div>
  </Card>;
}

export default ReelInsights;
