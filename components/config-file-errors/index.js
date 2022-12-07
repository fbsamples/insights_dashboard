import Card from '../card';

import { AiOutlineLink } from 'react-icons/ai';

import styles from './style.module.css';

const ConfigFileErrors = ({ errors }) => {
  const title = 'Looks like your config file is missing some fields';
  const subtitle = 'You need to create/update the config.json file in the root of the project. After you do it, refresh the page.';
  const subtitle2 = 'Check out the fields that you need to include in the config.json file: ';

  const loadDoc = (docLink) => {
    window.open(docLink, '_blank');
  }

  return <Card>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.subtitle}>{subtitle}</p>
    <p className={styles.subtitle}>{subtitle2}</p>
    { errors.map((error, idx) => {
      return <div className={styles.missingField} key={idx}>
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
