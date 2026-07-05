/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Tag } from '@moduix/react';
import styles from './tag-demo.module.css';

export function TagAsChildDemo() {
  return (
    <Tag asChild variant="outline">
      <button className={styles.buttonTag} type="button">
        <Tag.Label>Open filter</Tag.Label>
      </button>
    </Tag>
  );
}

//#endregion