import { Tag } from '@moduix/solid/tag';
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
          <Tag.Label>{tag.label}</Tag.Label>
        </Tag>
      ))}
    </div>
  );
}