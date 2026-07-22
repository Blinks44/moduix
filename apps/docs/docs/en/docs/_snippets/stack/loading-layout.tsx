import { Skeleton, Stack } from '@moduix/react';
import styles from '@/components/examples/stack.module.css';

export default function StackSkeletonDemo() {
  return (
    <Stack gap={16} className={styles.skeletonCard}>
      <Skeleton height={144} borderRadius="var(--radius-lg)" />
      <Stack gap={12}>
        <Skeleton width="62%" height={18} />
        <Skeleton height={14} />
        <Skeleton width="78%" height={14} />
      </Stack>
    </Stack>
  );
}