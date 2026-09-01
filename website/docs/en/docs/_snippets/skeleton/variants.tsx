import { Skeleton } from '@moduix/react/skeleton';
import { Stack } from '@moduix/react/stack';
import styles from '@/components/examples/skeleton/skeleton-variants.module.css';

const variants = ['pulse', 'none'] as const;

export default function SkeletonVariantsDemo() {
  return (
    <Stack className={styles.root} gap={12}>
      {variants.map((variant) => (
        <Skeleton key={variant} height={18} variant={variant} />
      ))}
    </Stack>
  );
}