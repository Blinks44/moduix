import { Skeleton } from '@moduix/react/skeleton';
import { Stack } from '@moduix/react/stack';

const announcements = [
  {
    titleWidth: '62%',
  },
  {
    titleWidth: '48%',
  },
];

export default function SkeletonCompositionDemo() {
  return (
    <Stack gap={12} style={{ width: '100%', paddingBlock: 'var(--moduix-spacing-1)' }}>
      {announcements.map((item) => (
        <Stack
          key={item.titleWidth}
          direction={{
            mobile: 'column',
            desktop: 'row',
          }}
          gap={12}
        >
          <Skeleton width={72} height={48} />
          <Stack gap={8} fill>
            <Skeleton width={item.titleWidth} height={14} />
            <Skeleton height={14} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}