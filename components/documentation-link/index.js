import React from 'react';
import { BsFillBookFill } from "react-icons/bs";

import styles from './style.module.css';

const DocumentationLink = ({ description, linkLabel, link }) => {
    return <div className={styles.container}>
        <BsFillBookFill className={styles.icon}/>
        <span className="documentation">
            { description }&nbsp;
            <a className={styles.link} href={link} target="blank">{linkLabel}</a>
        </span>
    </div>
}

export default DocumentationLink;
