import React from 'react';
import * as AntDesignIcons from "react-icons/ai";

import styles from './style.module.css';

const ErrorCard = ({ error={}, icon='AiFillInfoCircle', message }) => {
  const apiErrorLabel = 'API Error';
  return <div className={styles.card}>
    <div className={styles.rowContainer}>
      { icon && <span className={styles.icon}>{ AntDesignIcons[icon]() }</span> }
      <span className={styles.messageOverflow} title={message || apiErrorLabel}>{ error?.message ? apiErrorLabel : message }</span>
    </div>

    { error?.message && <div className={styles.apiError}>
        <span className={styles.label}>Message: </span>
        {error.message}
      </div>
    }

    <div className={styles.additionalDetails}>
      { Object.keys(error).map(key => {
          if (key !== 'message') {
            return <span key={key} className={styles.spacer}>
              <span className={styles.label}>{key}:</span> {error[key]}
            </span>;
          }
        })
      }
    </div>
  </div>;
}

export default ErrorCard;
