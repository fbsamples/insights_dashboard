import styles from './style.module.css'

const Section = ({ title, subtitle, children }) => {
  return <div className={styles.section}>
    <div className={styles.header}>
      <h1 className={styles.title}>{ title }</h1>
      { subtitle && <span className={styles.subtitle}>({subtitle})</span> }
    </div>
    { children }
  </div>;
}

export default Section;
