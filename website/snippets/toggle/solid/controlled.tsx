import { Stack } from '@moduix/solid/stack';
import { Toggle } from '@moduix/solid/toggle';
import { Bell as BellIcon } from 'lucide-solid';
import { createSignal } from 'solid-js';

export default function ControlledToggleDemo() {
  const [pressed, setPressed] = createSignal(false);

  return (
    <Stack align="center" gap="3">
      <Toggle pressed={pressed()} onPressedChange={setPressed}>
        <BellIcon />
        {pressed() ? 'Notifications on' : 'Notifications off'}
      </Toggle>
      <div data-preview-meta>
        <output>Notifications: {pressed() ? 'on' : 'off'}</output>
      </div>
    </Stack>
  );
}