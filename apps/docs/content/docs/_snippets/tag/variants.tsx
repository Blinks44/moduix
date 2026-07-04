/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Tag } from '@moduix/react';
import styles from './tag-demo.module.css';

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;

export function TagVariantsDemo() {
  return (
    <div className={styles.row}>
      {variants.map((variant) => (
        <Tag key={variant} variant={variant}>
          <Tag.Label>{variant}</Tag.Label>
        </Tag>
      ))}
    </div>
  );
}

//#endregion