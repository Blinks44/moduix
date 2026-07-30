import { Separator, Stack, Text } from '@moduix/react';

export default function StackSeparatorDemo() {
  return (
    <Stack direction="row" align="center" gap={10} style={{ inlineSize: '100%' }}>
      <Text weight="semibold">Design</Text>
      <Separator orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Engineering</Text>
      <Separator orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Docs</Text>
    </Stack>
  );
}