import { Stack, Text } from '@moduix/react';
import styles from '@/components/examples/stack.module.css';

export default function StackRowDemo() {
  return (
    <Stack direction="row" align="center" justify="space-between" gap={12} className={styles.row}>
      <Text weight="semibold">Status</Text>
      <Text tone="muted">Ready to publish</Text>
    </Stack>
  );
}