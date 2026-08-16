import { Separator } from '@moduix/react/separator';
import { Stack } from '@moduix/react/stack';
import { Text } from '@moduix/react/text';

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