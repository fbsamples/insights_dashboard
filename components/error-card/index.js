import React from 'react';
import * as AntDesignIcons from "react-icons/ai";
import config_file_errors from '../../constants/config-file-errors.json';

import styles from './style.module.css';

const ErrorCard = ({ error={}, icon='AiFillInfoCircle', message }) => {
  const errorTitle = config_file_errors.api.title;
  return <div className={`error-card ${styles.card}`}>
    <div className={styles.rowContainer}>
      { icon && <span className={styles.icon}>{ AntDesignIcons[icon]() }</span> }
      <span className={`title ${styles.messageOverflow}`} title={message || errorTitle}>{ error?.message ? errorTitle : message }</span>
    </div>

    { error?.message && <div className={styles.apiError}>
        <span className={styles.label}>{`${config_file_errors.api.title.label}: `} </span>
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
