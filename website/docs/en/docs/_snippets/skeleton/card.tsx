import { Skeleton } from '@moduix/react/skeleton';
import { Stack } from '@moduix/react/stack';

const cardSkeleton = {
  mediaHeight: 148,
  titleWidth: '70%',
  bodyWidth: '82%',
};

export default function SkeletonCardDemo() {
  return (
    <Stack gap={16} style={{ width: '100%' }}>
      <Skeleton height={cardSkeleton.mediaHeight} borderRadius="var(--moduix-radius-lg)" />
      <Stack gap={12}>
        <Skeleton width={cardSkeleton.titleWidth} height={20} />
        <Skeleton height={14} />
        <Skeleton width={cardSkeleton.bodyWidth} height={14} />
      </Stack>
    </Stack>
  );
}