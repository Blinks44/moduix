/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Skeleton, Stack } from '@moduix/react';
import styles from './stack.module.css';

export function StackSkeletonDemo() {
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

//#endregion