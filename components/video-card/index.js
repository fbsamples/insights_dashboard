import { formatTimestampToDateAndTime } from '../../utils/date';

import styles from './style.module.css';

const VideoCard = ({children, video}) => {
  const altLabel = 'no title found';

  return <div className={styles.videoContainer} id={video.id} key={video.id}>
    <div className={styles.videoDescription}>
      <h2>
        Video Title: {video.description}
        { !video.description && <span className={styles.altLabel}>{altLabel}</span> }
      </h2>
      <span>ID: {video.id}</span>
    </div>
    <h3 className={styles.videoDateAndTime}>{formatTimestampToDateAndTime(video.updated_time)}</h3>
    <div className={styles.rowContainer}>
      {children}
    </div>
  </div>;
}

export default VideoCard;
