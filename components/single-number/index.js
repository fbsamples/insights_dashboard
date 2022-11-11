import React from 'react';
import * as AntDesignIcons from "react-icons/ai";

import styles from './style.module.css';

const SingleNumber = ({ data, icons }) => {

    const getIcon = () => {
        return AntDesignIcons[icons[data.name]];
    }

    const getLastNumber = () => {
        const len = data.datasets[0].data.length;
        const lastNumber = data.datasets[0].data[len - 1];
        return new Intl.NumberFormat().format(lastNumber);
    }

    return <div>
        <p className={styles.metricContainer}>
            <span className={styles.icon}>{ getIcon()() }</span>
            { getLastNumber() } fans
        </p>
        <p className={styles.metricDescription}>{data.description}</p>
    </div>;
}

export default SingleNumber;
