/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';
import styles from './separator-demo.module.css';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;

export function SeparatorSizesDemo() {
  return (
    <div className={styles.section}>
      {sizes.map((size) => (
        <div key={size} className={styles.exampleRow}>
          <span className={styles.text}>{size}</span>
          <Separator size={size} />
        </div>
      ))}
    </div>
  );
}

//#endregion