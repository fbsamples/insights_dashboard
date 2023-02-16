import React from 'react';
import * as AntDesignIcons from "react-icons/ai";

import { abbreviateNumber } from '../../utils/strings';

import styles from './style.module.css';

const DoubleNumber = ({ datasets, icons, labels }) => {
    const getLabel = (label) => {
        return labels[label];
    }

    const getLastNumber = (data) => {
        const len = data.length;
        const lastNumber = data[len - 1];
        return abbreviateNumber(lastNumber);
    }

    return <div>
        <p className={styles.metricContainer}>
            <span className={`metric-value-${datasets[0].label}`}>{ getLastNumber(datasets[0].data) }</span>
            <span> { getLabel(datasets[0].label) }</span>
        </p>
        { datasets.length > 1 && <p className={styles.metricContainer}>
            <span className={`metric-value-${datasets[1].label}`}>{ getLastNumber(datasets[1].data) }</span>
            <span> { getLabel(datasets[1].label) }</span>
        </p> }

    </div>;
}

export default DoubleNumber;
