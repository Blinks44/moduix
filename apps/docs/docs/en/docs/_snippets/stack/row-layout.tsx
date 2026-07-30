import { Stack, Text } from '@moduix/react';

export default function StackRowDemo() {
  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      gap={12}
      style={{ inlineSize: '100%' }}
    >
      <Text weight="semibold">Status</Text>
      <Text tone="muted">Ready to publish</Text>
    </Stack>
  );
}