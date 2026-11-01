import { Stack } from '@moduix/solid/stack';
import { Text } from '@moduix/solid/text';

export default function TextSizesDemo() {
  return (
    <Stack gap="3">
      <Text size="xl">Extra-large text</Text>
      <Text size="lg">Large text</Text>
      <Text size="md">Medium text</Text>
      <Text size="sm">Small text</Text>
      <Text size="xs">Extra-small text</Text>
    </Stack>
  );
}