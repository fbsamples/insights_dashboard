import React from 'react';
import * as AntDesignIcons from "react-icons/ai";

import { abbreviateNumber } from '../../utils/strings';

import styles from './style.module.css';

const AggregateByProperty = ({ datasets, icons, ads=false, plural=true }) => {

    const getSumOfAllValues = (data) => {
        let value = data.reduce((a, b) => a + b);
        if (ads){
            value = data.reduce((a, b) => Number(a) + Number(b));
        }
        return abbreviateNumber(value);
    }

    const getIcon = (label) => {
        return AntDesignIcons[icons[label]];
    }

    return <div>
        { datasets.map(({ data, label }) => {
            return <div key={label} className={`${label.toLowerCase()} ${styles.toast}`}>
                <span className={styles.icon}>{ getIcon(label)() }</span>
                <span className="metric-value">{ getSumOfAllValues(data) + ' ' }</span>
                <span className={styles.propertyName}>{label.toLowerCase()}{plural && !ads && 's'}</span>
            </div>;
            })
        }
    </div>;
}

export default AggregateByProperty;
