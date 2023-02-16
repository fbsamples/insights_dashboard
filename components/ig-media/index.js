import * as AntDesignIcons from 'react-icons/ai';

import { abbreviateNumber } from '../../utils/strings';

import styles from './style.module.css'

const IgMedia = ({ data, icons }) => {

    const getIcon = (metricName) => {
        return AntDesignIcons[icons[metricName]];
    }

    return <div className={styles.container} id={data.id}>
        { data.media_type === 'IMAGE' &&  <img src={data.media_url} className={styles.image}/> }
        { data.media_type === 'VIDEO' &&  <video src={data.media_url} className={styles.image} controls/> }
        <div className={styles.metricContainer}>
            { data.insights.map(el => {
                return <div className={`ig-media-${el.name} ${styles.metric}`} key={el.id}>
                    <span className={styles.metricIcon}>{ getIcon(el.name)() }</span>
                    <span className={`metric-value ${styles.metricValue}`}>{ abbreviateNumber(el.values[0].value) }</span>
                </div>
            })}
        </div>
    </div>;
}

export default IgMedia;
