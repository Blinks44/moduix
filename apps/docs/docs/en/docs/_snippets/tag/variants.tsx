import { Tag } from '@moduix/react';
import styles from '@/components/examples/tag.module.css';

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;

export default function TagVariantsDemo() {
  return (
    <div className={styles.row}>
      {variants.map((variant) => (
        <Tag key={variant} variant={variant}>
          <Tag.Label>{variant}</Tag.Label>
        </Tag>
      ))}
    </div>
  );
}