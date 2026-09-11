import { Stack } from '@moduix/solid/stack';
import { Text } from '@moduix/solid/text';

export default function StackRowDemo() {
  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      gap={12}
      style={{ 'inline-size': '100%' }}
    >
      <Text weight="semibold">Status</Text>
      <Text tone="muted">Ready to publish</Text>
    </Stack>
  );
}