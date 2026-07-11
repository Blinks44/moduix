/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';
import styles from './separator-demo.module.css';

const sections = ['Personal details', 'Notifications'];

export function DecorativeSeparatorDemo() {
  return (
    <div className={styles.card}>
      <div className={styles.stack}>
        <span className={styles.text}>{sections[0]}</span>
        <Separator role="presentation" />
        <span className={styles.text}>{sections[1]}</span>
      </div>
    </div>
  );
}

//#endregion