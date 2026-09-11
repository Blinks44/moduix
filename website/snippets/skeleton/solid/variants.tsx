import { Skeleton } from '@moduix/solid/skeleton';
import { Stack } from '@moduix/solid/stack';
import styles from '@/components/examples/skeleton/skeleton-variants.module.css';

const variants = ['pulse', 'none'] as const;

export default function SkeletonVariantsDemo() {
  return (
    <Stack class={styles.root} gap={12}>
      {variants.map((variant) => (
        <Skeleton height={18} variant={variant} />
      ))}
    </Stack>
  );
}