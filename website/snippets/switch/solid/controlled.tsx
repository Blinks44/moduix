import { Stack } from '@moduix/solid/stack';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/solid/switch';
import { createSignal } from 'solid-js';

export default function ControlledSwitchDemo() {
  const [checked, setChecked] = createSignal(true);

  return (
    <Stack align="center" gap="3">
      <Switch checked={checked()} onCheckedChange={(details) => setChecked(details.checked)}>
        <SwitchControl />
        <SwitchLabel>{checked() ? 'On' : 'Off'}</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <div data-preview-meta>
        <output>Current value: {String(checked())}</output>
      </div>
    </Stack>
  );
}