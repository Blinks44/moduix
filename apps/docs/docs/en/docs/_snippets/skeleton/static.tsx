import { Skeleton } from '@moduix/react';
import styles from '@/components/examples/skeleton.module.css';

const staticSkeleton = {
  width: 320,
  height: 72,
  variant: 'none',
} as const;

export default function StaticSkeletonDemo() {
  return (
    <Skeleton
      width={staticSkeleton.width}
      height={staticSkeleton.height}
      variant={staticSkeleton.variant}
      className={styles.staticSkeleton}
    />
  );
}