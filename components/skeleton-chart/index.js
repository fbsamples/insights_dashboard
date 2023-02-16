import Card from '../card';

import styles from './style.module.css';

const SkeletonChart = ({ size='small' }) => {
    return <Card>
        <div className={`${styles.container} ${styles[size]}`}>
            <span className={styles.loader}></span>
        </div>
    </Card>;
}

export default SkeletonChart;
