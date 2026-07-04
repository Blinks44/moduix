/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CheckIcon, Tag } from '@moduix/react';
import styles from './tag-demo.module.css';

const tags = [
  {
    label: 'Selected',
    variant: 'default',
    removable: false,
  },
  {
    label: 'Deployed',
    variant: 'outline',
    removable: true,
  },
] as const;

export function TagWithIconDemo() {
  return (
    <div className={styles.row}>
      {tags.map((tag) => (
        <Tag key={tag.label} variant={tag.variant}>
          <Tag.StartElement>
            <CheckIcon />
          </Tag.StartElement>
          <Tag.Label>{tag.label}</Tag.Label>
          {tag.removable ? (
            <Tag.EndElement>
              <Tag.CloseTrigger aria-label={`Remove ${tag.label} tag`} />
            </Tag.EndElement>
          ) : null}
        </Tag>
      ))}
    </div>
  );
}

//#endregion