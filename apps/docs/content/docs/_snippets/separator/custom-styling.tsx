/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';
import styles from './separator-demo.module.css';

const steps = ['Completed profile', 'Next step: billing details'];

export function CustomSeparatorDemo() {
  return (
    <div className={styles.section}>
      <span className={styles.text}>{steps[0]}</span>
      <Separator className={styles.customSeparator} />
      <span className={styles.text}>{steps[1]}</span>
    </div>
  );
}

//#endregion