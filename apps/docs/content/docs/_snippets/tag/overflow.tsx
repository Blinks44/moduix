/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Tag } from '@moduix/react';
import styles from './tag-demo.module.css';

const label = 'Ready for stakeholder review after legal approval';

export function TagTruncatedDemo() {
  return (
    <Tag className={styles.constrained}>
      <Tag.Label title={label}>{label}</Tag.Label>
      <Tag.EndElement>
        <Tag.CloseTrigger aria-label="Remove long tag" />
      </Tag.EndElement>
    </Tag>
  );
}

//#endregion