import styles from './style.module.css'

const Tooltip = ({ info }) => {
  return <div className={styles.container}>
    { info.map((info) => {
        return <div key={info.id}>
            <h1 className={styles.title}>{info.title}</h1>
            <p className={styles.metricName}>({info.name})</p>
            <p className={styles.description}>{info.description}</p>
          </div>;
        })
    }
  </div>;
}

export default Tooltip;
