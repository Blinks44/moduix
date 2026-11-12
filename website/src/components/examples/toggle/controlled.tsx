import { Stack } from '@moduix/react/stack';
import { Toggle } from '@moduix/react/toggle';
import { Bell as BellIcon } from 'lucide-react';
import { useState } from 'react';

export default function ControlledToggleDemo() {
  const [pressed, setPressed] = useState(false);
  return (
    <Stack align="center" gap="3">
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <BellIcon />
        {pressed ? 'Notifications on' : 'Notifications off'}
      </Toggle>
      <div data-preview-meta>
        <output>Notifications: {pressed ? 'on' : 'off'}</output>
      </div>
    </Stack>
  );
}