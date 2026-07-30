import { Skeleton, Stack } from '@moduix/react';

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