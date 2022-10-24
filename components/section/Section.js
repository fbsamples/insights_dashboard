import styles from './Section.module.css'

const Section = (props) => {
  return <div className={styles.section}>
    <h1 className={styles.title}>{props.title}</h1>
    {props.children}
  </div>;
}

export default Section;
