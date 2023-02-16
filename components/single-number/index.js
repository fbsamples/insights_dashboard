import React from 'react';
import * as AntDesignIcons from "react-icons/ai";

import { abbreviateNumber } from '../../utils/strings';
import styles from './style.module.css';

const SingleNumber = ({ data, icons, labels }) => {

    const getIcon = () => {
        return AntDesignIcons[icons[data.name]];
    }

    const getLabel = () => {
        return labels[data.name];
    }

    const getLastNumber = () => {
        const len = data.datasets[0].data.length;
        const lastNumber = data.datasets[0].data[len - 1];
        return abbreviateNumber(lastNumber);
    }

    return <div>
        <p className={styles.metricContainer}>
            <span className={styles.icon}>{ getIcon()() }</span>
            <span className="metric-value">{ getLastNumber() } {getLabel()}</span>
        </p>
        <p className={styles.metricDescription}>{data.description}</p>
    </div>;
}

export default SingleNumber;
