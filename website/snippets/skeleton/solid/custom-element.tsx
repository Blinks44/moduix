import { Skeleton } from '@moduix/solid/skeleton';
import styles from '@/components/examples/skeleton/skeleton-custom-element.module.css';

const loadingRegion = {
  label: 'Loading summary',
};

export default function CustomElementSkeletonDemo() {
  return (
    <Skeleton
      asChild={(props) => <section {...props()} aria-label={loadingRegion.label} />}
      class={styles.root}
      height={72}
      borderRadius="var(--moduix-radius-lg)"
    />
  );
}