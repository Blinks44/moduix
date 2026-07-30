import { Stack, Text } from '@moduix/react';

export default function StackResponsiveDirectionDemo() {
  return (
    <Stack
      direction={{
        mobile: 'column',
        desktop: 'row',
      }}
      gap={12}
      style={{ inlineSize: '100%' }}
    >
      <Text weight="semibold">Adaptive layout</Text>
      <Text tone="muted">Column on mobile, row from desktop width.</Text>
    </Stack>
  );
}