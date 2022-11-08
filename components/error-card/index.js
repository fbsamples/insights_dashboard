import React from 'react';
import * as AntDesignIcons from "react-icons/ai";

import styles from './style.module.css';

const ErrorCard = ({ children, icon }) => {
    return <div className={styles.card}>
        { icon && <span className={styles.icon}>{ AntDesignIcons[icon]() }</span> }
        { children }
    </div>;
}

export default ErrorCard;
