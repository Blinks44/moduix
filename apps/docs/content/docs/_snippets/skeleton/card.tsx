/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Skeleton, Stack } from '@moduix/react';
import styles from './skeleton-card-demo.module.css';

const cardSkeleton = {
  mediaHeight: 148,
  titleWidth: '70%',
  bodyWidth: '82%',
};

export function SkeletonCardDemo() {
  return (
    <Stack gap={16} className={styles.card}>
      <Skeleton height={cardSkeleton.mediaHeight} borderRadius="var(--radius-lg)" />
      <Stack gap={12}>
        <Skeleton width={cardSkeleton.titleWidth} height={20} />
        <Skeleton height={14} />
        <Skeleton width={cardSkeleton.bodyWidth} height={14} />
      </Stack>
    </Stack>
  );
}

//#endregion