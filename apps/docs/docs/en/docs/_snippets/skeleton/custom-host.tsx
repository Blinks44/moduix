import { Skeleton } from '@moduix/react';
import styles from '@/components/examples/skeleton.module.css';

const loadingRegion = {
  label: 'Loading summary',
};

export default function SkeletonAsChildDemo() {
  return (
    <Skeleton asChild height={72} borderRadius="var(--radius-lg)" className={styles.asChild}>
      <section aria-label={loadingRegion.label} />
    </Skeleton>
  );
}