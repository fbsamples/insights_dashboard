import React from 'react';
import * as AntDesignIcons from "react-icons/ai";

import { abbreviateNumber } from '../../utils/strings';

import styles from './style.module.css';

const AggregateByProperty = ({ datasets, icons, plural=true }) => {

    const getSumOfAllValues = (data) => {
        const value = data.reduce((a, b) => a + b);
        return abbreviateNumber(value);
    }

    const getIcon = (label) => {
        return AntDesignIcons[icons[label]];
    }

    return <div>
        { datasets.map(({ data, label }) => {
            return <div key={label} className={styles.toast}>
                <span className={styles.icon}>{ getIcon(label)() }</span>
                { getSumOfAllValues(data) + ' ' }
                <span className={styles.propertyName}>{label.toLowerCase()}{plural && 's'}</span>
            </div>;
            })
        }
    </div>;
}

export default AggregateByProperty;
