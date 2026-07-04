/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';
import styles from './separator-demo.module.css';

const sections = ['Account settings', 'Billing details'];

export function SeparatorDemo() {
  return (
    <div className={styles.card}>
      <div className={styles.stack}>
        <span className={styles.text}>{sections[0]}</span>
        <Separator />
        <span className={styles.text}>{sections[1]}</span>
      </div>
    </div>
  );
}

//#endregion