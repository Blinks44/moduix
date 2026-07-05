/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Skeleton, Stack } from '@moduix/react';
import styles from './skeleton-media-object-demo.module.css';

const userRowSkeleton = {
  avatarSize: 48,
  titleWidth: '46%',
  bodyWidth: '72%',
};

export function SkeletonMediaObjectDemo() {
  return (
    <Stack direction="row" align="center" gap={12} className={styles.mediaObject}>
      <Skeleton boxSize={userRowSkeleton.avatarSize} borderRadius="var(--radius-full)" />
      <Stack gap={8} fill>
        <Skeleton width={userRowSkeleton.titleWidth} height={16} />
        <Skeleton height={14} />
        <Skeleton width={userRowSkeleton.bodyWidth} height={14} />
      </Stack>
    </Stack>
  );
}

//#endregion