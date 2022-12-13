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
            { getLastNumber(datasets[0].data) } { getLabel(datasets[0].label) }
        </p>
        { datasets.length > 1 && <p className={styles.secondMetricContainer}>
            { getLastNumber(datasets[1].data) } { getLabel(datasets[1].label) }
        </p> }

    </div>;
}

export default DoubleNumber;
