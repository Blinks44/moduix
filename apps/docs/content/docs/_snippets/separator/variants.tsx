/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';
import styles from './separator-demo.module.css';

const variants = ['solid', 'dashed', 'dotted'] as const;

export function SeparatorVariantsDemo() {
  return (
    <div className={styles.section}>
      {variants.map((variant) => (
        <div key={variant} className={styles.exampleRow}>
          <span className={styles.text}>{variant}</span>
          <Separator variant={variant} />
        </div>
      ))}
    </div>
  );
}

//#endregion