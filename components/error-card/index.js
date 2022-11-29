import React from 'react';
import * as AntDesignIcons from "react-icons/ai";

import styles from './style.module.css';

const ErrorCard = ({ error, icon }) => {
    console.log(error);
    return <div className={styles.card}>
        <div className={styles.rowContainer}>
            { icon && <span className={styles.icon}>{ AntDesignIcons[icon]() }</span> }
            <span className={styles.messageOverflow} title={error.message}>{ error.message }</span>
        </div>
        <div className={styles.additionalDetails}>
            { Object.keys(error).map(key => {
                if (key !== 'message') {
                    return <span className={styles.spacer}>
                        <span className={styles.label}>{key}:</span> {error[key]}
                    </span>;
                }
            }) }
        </div>
    </div>;
}

export default ErrorCard;
