import styles from './style.module.css'

const Section = ({ title, subtitle, children }) => {
  return <div className={`section ${styles.section}`}>
    <div className={`section-header ${styles.header}`}>
      <h1 className={styles.title}>{ title }</h1>
      { subtitle && <span className={styles.subtitle}>({subtitle})</span> }
    </div>
    <div className="section-body">
      { children }
    </div>
  </div>;
}

export default Section;
