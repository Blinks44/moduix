import { Skeleton } from '@moduix/react/skeleton';
import { Stack } from '@moduix/react/stack';

const variants = ['pulse', 'none'] as const;

export default function SkeletonVariantsDemo() {
  return (
    <Stack gap={12} style={{ width: '100%' }}>
      {variants.map((variant) => (
        <Skeleton key={variant} height={18} variant={variant} />
      ))}
    </Stack>
  );
}