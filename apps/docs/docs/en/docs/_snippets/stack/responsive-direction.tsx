import { Stack, Text } from '@moduix/react';
import styles from '@/components/examples/stack.module.css';

export default function StackResponsiveDirectionDemo() {
  return (
    <Stack
      direction={{
        mobile: 'column',
        desktop: 'row',
      }}
      gap={12}
      className={styles.row}
    >
      <Text weight="semibold">Adaptive layout</Text>
      <Text tone="muted">Column on mobile, row from desktop width.</Text>
    </Stack>
  );
}