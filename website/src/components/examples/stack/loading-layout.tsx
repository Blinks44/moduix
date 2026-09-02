import { Skeleton } from '@moduix/react/skeleton';
import { Stack } from '@moduix/react/stack';

export default function StackSkeletonDemo() {
  return (
    <Stack gap={16} style={{ inlineSize: '100%' }}>
      <Skeleton height={144} borderRadius="var(--moduix-radius-lg)" />
      <Stack gap={12}>
        <Skeleton width="62%" height={18} />
        <Skeleton height={14} />
        <Skeleton width="78%" height={14} />
      </Stack>
    </Stack>
  );
}