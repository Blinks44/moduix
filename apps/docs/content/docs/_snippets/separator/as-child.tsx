/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';
import styles from './separator-demo.module.css';

const labels = ['Before native rule', 'After native rule'];

export function SeparatorAsChildDemo() {
  return (
    <div className={styles.section}>
      <span className={styles.text}>{labels[0]}</span>
      <Separator asChild>
        <hr className={styles.nativeRule} />
      </Separator>
      <span className={styles.text}>{labels[1]}</span>
    </div>
  );
}

//#endregion