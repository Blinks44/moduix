/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Tag } from '@moduix/react';
import styles from './tag-demo.module.css';

const tags = [
  {
    label: 'TypeScript',
    variant: 'default',
  },
  {
    label: 'Design review',
    variant: 'secondary',
  },
  {
    label: 'Needs approval',
    variant: 'outline',
    disabled: true,
  },
] as const;

export function RemovableTagDemo() {
  return (
    <div className={styles.row}>
      {tags.map((tag) => (
        <Tag key={tag.label} variant={tag.variant}>
          <Tag.Label>{tag.label}</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger disabled={tag.disabled} aria-label={`Remove ${tag.label} tag`} />
          </Tag.EndElement>
        </Tag>
      ))}
    </div>
  );
}

//#endregion