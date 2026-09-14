import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/text/text-basic.module.css';

export default function TextDemo() {
  return (
    <div class={styles.stack}>
      <Text>Use text to describe interface state and supporting details.</Text>
      <Text as="small" tone="muted">
        Last updated 2 minutes ago
      </Text>
    </div>
  );
}