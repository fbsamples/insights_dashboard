import styles from './style.module.css'

const Tooltip = ({title, description, link, linkLabel}) => {
  const altLinkLabel = 'Click here to learn more.'

  return <div className={styles.container}>
    <h1>{title}</h1>
    <p>
      {description} &nbsp;
      <a className={styles.link} href={link}>{linkLabel ?? altLinkLabel}</a>
    </p>
  </div>;
}

export default Tooltip;
