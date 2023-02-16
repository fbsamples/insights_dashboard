import Card from '../card';

import { AiOutlineLink } from 'react-icons/ai';

import config_file_errors from '../../constants/config-file-errors.json';
import styles from './style.module.css';

const ConfigFileErrors = ({ errors }) => {
  const loadDoc = (docLink) => {
    window.open(docLink, '_blank');
  }

  return <Card>
    <h1 className={styles.title}>{config_file_errors.header.title}</h1>
    <p className={styles.subtitle}>{config_file_errors.header.subtitle}</p>
    <p className={styles.subtitle}>{config_file_errors.header.subtitle2}</p>
    { errors.map((error, idx) => {
      return <div id={`error-${error.field_name}`} className={styles.missingField} key={idx}>
        <div>
          <span className={styles.fieldName}>{error.field_name}: </span>
          {error.message}
        </div>
        <div>{error.doc_info}</div>
        <div className={styles.link} onClick={() => loadDoc(error.doc_link)}>
          <AiOutlineLink className={styles.icon}/>Documentation
        </div>
      </div>
    }) }
  </Card>;
}

export default ConfigFileErrors;
