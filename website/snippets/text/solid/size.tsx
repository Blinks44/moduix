import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/text/text-size.module.css';

export default function TextSizesDemo() {
  return (
    <div class={styles.stack}>
      <Text size="xl">Extra-large text</Text>
      <Text size="lg">Large text</Text>
      <Text size="md">Medium text</Text>
      <Text size="sm">Small text</Text>
      <Text size="xs">Extra-small text</Text>
    </div>
  );
}