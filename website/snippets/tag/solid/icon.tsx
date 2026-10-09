import { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement } from '@moduix/solid/tag';
import { Check as CheckIcon } from 'lucide-solid';
import styles from '@/components/examples/tag/tag-icon.module.css';

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

export default function TagWithIconDemo() {
  return (
    <div class={styles.row}>
      {tags.map((tag) => (
        <Tag variant={tag.variant}>
          <TagStartElement>
            <CheckIcon />
          </TagStartElement>
          <TagLabel>{tag.label}</TagLabel>
          {tag.removable ? (
            <TagEndElement>
              <TagCloseTrigger aria-label={`Remove ${tag.label} tag`} />
            </TagEndElement>
          ) : null}
        </Tag>
      ))}
    </div>
  );
}