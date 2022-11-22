import styles from './style.module.css';

import { formatTimestampToDateAndTime } from '../../utils/date';

const VideoCard = ({children, video}) => {
    return <div className={styles.videoContainer} key={video.id}>
      <div className={styles.videoDescription}>
        <h2>{video.description}</h2>
        <span>ID: {video.id}</span>
      </div>
      <h3 className={styles.videoDateAndTime}>{formatTimestampToDateAndTime(video.updated_time)}</h3>

      <div className={styles.rowContainer}>
        {children}
      </div>
    </div>;
}

export default VideoCard;
