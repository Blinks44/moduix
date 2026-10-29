import { Stack } from '@moduix/react/stack';
import { Text } from '@moduix/react/text';

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