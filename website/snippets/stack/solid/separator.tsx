import { Separator } from '@moduix/solid/separator';
import { Stack } from '@moduix/solid/stack';
import { Text } from '@moduix/solid/text';

export default function StackSeparatorDemo() {
  return (
    <Stack
      direction="row"
      align="center"
      justify="center"
      gap={10}
      style={{ 'inline-size': '100%' }}
    >
      <Text weight="semibold">Design</Text>
      <Separator orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Engineering</Text>
      <Separator orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Docs</Text>
    </Stack>
  );
}