import { Tag } from '@moduix/react';
import styles from '@/components/examples/tag.module.css';

export default function TagAsChildDemo() {
  return (
    <Tag asChild variant="outline">
      <button className={styles.buttonTag} type="button">
        <Tag.Label>Open filter</Tag.Label>
      </button>
    </Tag>
  );
}