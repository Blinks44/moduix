import { Skeleton } from '@moduix/solid/skeleton';
import { Stack } from '@moduix/solid/stack';

export default function StackFillDemo() {
  return (
    <Stack direction="row" align="center" gap={12} style={{ 'inline-size': '100%' }}>
      <Skeleton boxSize={40} borderRadius="var(--moduix-radius-full)" />
      <Stack direction="column" gap={8} fill>
        <Skeleton width="48%" height={16} />
        <Skeleton height={14} />
      </Stack>
    </Stack>
  );
}