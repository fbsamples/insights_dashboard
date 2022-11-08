import styles from './style.module.css'

const Tooltip = ({ title, description }) => {
  const altLinkLabel = 'Click here to learn more.'

  return <div className={styles.container}>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>;
}

export default Tooltip;
