import { Tag, TagLabel } from '@moduix/solid/tag';
import styles from '@/components/examples/tag/tag-sizes.module.css';

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

export default function TagSizesDemo() {
  return (
    <div class={styles.row}>
      {sizes.map((tag) => (
        <Tag size={tag.size}>
          <TagLabel>{tag.label}</TagLabel>
        </Tag>
      ))}
    </div>
  );
}
