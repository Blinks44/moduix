/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Tag } from '@moduix/react';
import styles from './tag-demo.module.css';

const sizes = [
  {
    label: 'Compact',
    size: 'sm',
  },
  {
    label: 'Default',
    size: 'md',
  },
] as const;

export function TagSizesDemo() {
  return (
    <div className={styles.row}>
      {sizes.map((tag) => (
        <Tag key={tag.size} size={tag.size}>
          <Tag.Label>{tag.label}</Tag.Label>
        </Tag>
      ))}
    </div>
  );
}

//#endregion