import { Separator, Stack, Text } from '@moduix/react';
import styles from '@/components/examples/stack.module.css';

export default function StackSeparatorDemo() {
  return (
    <Stack direction="row" align="center" gap={10} className={styles.row}>
      <Text weight="semibold">Design</Text>
      <Separator orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Engineering</Text>
      <Separator orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Docs</Text>
    </Stack>
  );
}