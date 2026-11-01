import { Stack } from '@moduix/react/stack';
import { Toggle } from '@moduix/react/toggle';

export default function ToggleVariantsDemo() {
  return (
    <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
      <Toggle>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="ghost">Ghost</Toggle>
      <Toggle defaultPressed>Pressed</Toggle>
    </Stack>
  );
}