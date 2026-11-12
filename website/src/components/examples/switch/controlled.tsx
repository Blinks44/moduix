import { Stack } from '@moduix/react/stack';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/react/switch';
import { useState } from 'react';

export default function ControlledSwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <Stack align="center" gap="3">
      <Switch checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <SwitchControl />
        <SwitchLabel>{checked ? 'On' : 'Off'}</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <div data-preview-meta>
        <output>Current value: {String(checked)}</output>
      </div>
    </Stack>
  );
}