import { Stack } from '@moduix/react/stack';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/react/switch';

export default function DisabledSwitchDemo() {
  return (
    <Stack align="center" gap="3">
      <Switch disabled>
        <SwitchControl />
        <SwitchLabel>Enable dark mode</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <Switch defaultChecked disabled>
        <SwitchControl />
        <SwitchLabel>Keep me signed in</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    </Stack>
  );
}