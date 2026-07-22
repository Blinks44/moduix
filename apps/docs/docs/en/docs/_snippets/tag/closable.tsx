import { Tag } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import styles from '@/components/examples/tag.module.css';

type DemoTag = {
  label: string;
  variant: ComponentProps<typeof Tag>['variant'];
  disabled?: boolean;
};

const tags: DemoTag[] = [
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
];

export default function RemovableTagDemo() {
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