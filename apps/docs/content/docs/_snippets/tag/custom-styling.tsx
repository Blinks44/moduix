/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CheckIcon, Tag } from '@moduix/react';
import styles from './tag-demo.module.css';

export function CustomTagDemo() {
  return (
    <div className={styles.row}>
      <Tag className={styles.customSoft}>
        <Tag.StartElement>
          <CheckIcon />
        </Tag.StartElement>
        <Tag.Label>Priority</Tag.Label>
        <Tag.EndElement>
          <Tag.CloseTrigger aria-label="Remove priority tag" />
        </Tag.EndElement>
      </Tag>
      <Tag className={styles.customOutline} variant="outline">
        <Tag.Label>Customer-facing</Tag.Label>
      </Tag>
    </div>
  );
}

//#endregion