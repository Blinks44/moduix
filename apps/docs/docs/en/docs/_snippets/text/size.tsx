import { Text } from '@moduix/react';
import styles from '@/components/examples/text.module.css';

export default function TextSizesDemo() {
  return (
    <div className={styles.stack}>
      <Text size="xl">Extra-large text</Text>
      <Text size="lg">Large text</Text>
      <Text size="md">Medium text</Text>
      <Text size="sm">Small text</Text>
      <Text size="xs">Extra-small text</Text>
    </div>
  );
}