import styles from './style.module.css'

const Card = (props) => {
  return (
    <div className={`${styles.card} ${props.shadow ? styles.shadow : styles.outline}`}>
      {props.children}
    </div>
  );
}

export default Card;
