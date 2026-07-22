import { Skeleton, Stack } from '@moduix/react';
import styles from '@/components/examples/stack.module.css';

export default function StackFillDemo() {
  return (
    <Stack direction="row" align="center" gap={12} className={styles.row}>
      <Skeleton boxSize={40} borderRadius="var(--radius-full)" />
      <Stack direction="column" gap={8} fill>
        <Skeleton width="48%" height={16} />
        <Skeleton height={14} />
      </Stack>
    </Stack>
  );
}