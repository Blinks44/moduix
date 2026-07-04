/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Skeleton } from '@moduix/react';
import styles from './static-skeleton-demo.module.css';

const staticSkeleton = {
  width: 320,
  height: 72,
  variant: 'none',
} as const;

export function StaticSkeletonDemo() {
  return (
    <Skeleton
      width={staticSkeleton.width}
      height={staticSkeleton.height}
      variant={staticSkeleton.variant}
      className={styles.staticSkeleton}
    />
  );
}

//#endregion