import * as AntDesignIcons from 'react-icons/ai';

import { capitalizeAll } from '../../utils/strings';

import styles from './style.module.css'

const IgMediaHeader = ({metrics, instagramMediaInsightsData, icons}) => {

    const getIcon = (metricName) => {
        return AntDesignIcons[icons[metricName]];
    }

    return <div>
        <h1 className={styles.chartTitle}> Instagram Media Insights </h1>
        <div className={styles.metrics}> ({ metrics.join(',') }) </div>
        { instagramMediaInsightsData.length > 0 && instagramMediaInsightsData[0].insights.map(el => {
            return <div key={el.name} className={styles.metric}>
                <span className={styles.icon}>{ getIcon(el.name)() }</span>
                <span className={styles.metricName}>{ capitalizeAll(el.name) }: </span>
                <span className={styles.metricDescription}>{ el.description }</span>
            </div>
        })}
    </div>
}

export default IgMediaHeader;
