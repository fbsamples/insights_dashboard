import React from 'react';
import * as AntDesignIcons from "react-icons/ai";

import styles from './style.module.css';

const AggregateByProperty = ({ datasets, icons }) => {

    const getSumOfAllValues = (data) => {
        const value = data.reduce((a, b) => a + b);
        return new Intl.NumberFormat().format(value);
    }

    const getIcon = (label) => {
        return AntDesignIcons[icons[label]];
    }

    return <div>
        { datasets.map(({ data, label }) => {
            return <div key={label} className={styles.toast}>
                <span className={styles.icon}>{ getIcon(label)() }</span>
                { getSumOfAllValues(data) + ' ' }
                <span className={styles.propertyName}>{label}s</span>
            </div>;
            })
        }
    </div>;
}

export default AggregateByProperty;
