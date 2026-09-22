import { Tag, TagLabel } from '@moduix/react/tag';
import styles from '@/components/examples/tag/tag-render-as-button.module.css';

export default function TagAsChildDemo() {
  return (
    <Tag asChild variant="outline">
      <button className={styles.buttonTag} type="button">
        <TagLabel>Open filter</TagLabel>
      </button>
    </Tag>
  );
}