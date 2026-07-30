import { Skeleton, Stack } from '@moduix/react';

const userRowSkeleton = {
  avatarSize: 48,
  titleWidth: '46%',
  bodyWidth: '72%',
};

export default function SkeletonMediaObjectDemo() {
  return (
    <Stack direction="row" align="center" gap={12} style={{ width: '100%' }}>
      <Skeleton boxSize={userRowSkeleton.avatarSize} borderRadius="var(--moduix-radius-full)" />
      <Stack direction="column" gap={8} fill>
        <Skeleton width={userRowSkeleton.titleWidth} height={16} />
        <Skeleton height={14} />
        <Skeleton width={userRowSkeleton.bodyWidth} height={14} />
      </Stack>
    </Stack>
  );
}