import { Stack } from '@moduix/react/stack';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/react/switch';

export default function ReadOnlySwitchDemo() {
  return (
    <Stack align="flex-start" gap="3">
      <Switch readOnly>
        <SwitchControl />
        <SwitchLabel>Managed by policy</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <Switch defaultChecked readOnly>
        <SwitchControl />
        <SwitchLabel>Always on</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    </Stack>
  );
}