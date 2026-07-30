import { Skeleton, Stack } from '@moduix/react';

const lines = [
  {
    width: '100%',
    height: 18,
  },
  {
    width: '86%',
    height: 18,
  },
  {
    width: '64%',
    height: 18,
  },
];

export default function SkeletonDemo() {
  return (
    <Stack gap={10} style={{ width: '100%' }}>
      {lines.map((line) => (
        <Skeleton key={line.width} width={line.width} height={line.height} />
      ))}
    </Stack>
  );
}