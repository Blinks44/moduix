import { Tag } from '@moduix/solid/tag';
import styles from '@/components/examples/tag/tag-variants.module.css';

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;

export default function TagVariantsDemo() {
  return (
    <div class={styles.row}>
      {variants.map((variant) => (
        <Tag variant={variant}>
          <Tag.Label>{variant}</Tag.Label>
        </Tag>
      ))}
    </div>
  );
}