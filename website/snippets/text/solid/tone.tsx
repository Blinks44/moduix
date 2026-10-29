import { Stack } from '@moduix/solid/stack';
import { Text } from '@moduix/solid/text';

export default function TextTonesDemo() {
  return (
    <Stack gap="3">
      <Text tone="default">Default tone</Text>
      <Text tone="muted">Muted tone</Text>
      <Text tone="primary">Primary tone</Text>
      <Text tone="destructive">Destructive tone</Text>
    </Stack>
  );
}