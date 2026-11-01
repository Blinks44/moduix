import { Stack } from '@moduix/react/stack';
import { Toggle } from '@moduix/react/toggle';

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