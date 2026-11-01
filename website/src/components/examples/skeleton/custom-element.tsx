import { Skeleton } from '@moduix/react/skeleton';
import styles from '@/components/examples/skeleton/skeleton-custom-element.module.css';

const loadingRegion = {
  label: 'Loading summary',
};

export default function CustomElementSkeletonDemo() {
  return (
    <Skeleton asChild className={styles.root} height={72} borderRadius="var(--moduix-radius-lg)">
      <section aria-label={loadingRegion.label} />
    </Skeleton>
  );
}