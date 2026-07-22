import { Skeleton, Stack } from '@moduix/react';
import styles from '@/components/examples/skeleton.module.css';

const variants = ['pulse', 'none'] as const;

export default function SkeletonVariantsDemo() {
  return (
    <Stack gap={12} className={styles.stack}>
      {variants.map((variant) => (
        <Skeleton key={variant} height={18} variant={variant} />
      ))}
    </Stack>
  );
}