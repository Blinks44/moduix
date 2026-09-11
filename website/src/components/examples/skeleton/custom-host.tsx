import { Skeleton } from '@moduix/react/skeleton';
import styles from '@/components/examples/skeleton/skeleton-custom-host.module.css';

const loadingRegion = {
  label: 'Loading summary',
};

export default function SkeletonAsChildDemo() {
  return (
    <Skeleton asChild className={styles.root} height={72} borderRadius="var(--moduix-radius-lg)">
      <section aria-label={loadingRegion.label} />
    </Skeleton>
  );
}