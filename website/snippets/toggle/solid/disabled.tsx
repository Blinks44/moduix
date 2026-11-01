import { Stack } from '@moduix/solid/stack';
import { Toggle } from '@moduix/solid/toggle';

export default function DisabledToggleDemo() {
  return (
    <Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
      <Toggle disabled>Disabled</Toggle>
      <Toggle defaultPressed disabled>
        Pressed
      </Toggle>
    </Stack>
  );
}