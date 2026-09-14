import { Stack } from '@moduix/solid/stack';
import { Text } from '@moduix/solid/text';

export default function StackResponsiveDirectionDemo() {
  return (
    <Stack
      direction={{
        mobile: 'column',
        desktop: 'row',
      }}
      gap={12}
      justify="center"
      style={{ 'inline-size': '100%' }}
    >
      <Text weight="semibold">Adaptive layout</Text>
      <Text tone="muted">Column on mobile, row from desktop width.</Text>
    </Stack>
  );
}