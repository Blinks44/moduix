/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Tag } from '@moduix/react';
import { useState } from 'react';
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
  const [visibleTags, setVisibleTags] = useState(tags);

  return (
    <div className={styles.row}>
      {visibleTags.map((tag) => (
        <Tag key={tag.label} variant={tag.variant}>
          <Tag.Label>{tag.label}</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger
              disabled={tag.disabled}
              aria-label={`Remove ${tag.label} tag`}
              onClick={() => {
                setVisibleTags((tags) => tags.filter((item) => item.label !== tag.label));
              }}
            />
          </Tag.EndElement>
        </Tag>
      ))}
    </div>
  );
}

//#endregion