import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/react/switch';

export default function InitialCheckedSwitchDemo() {
  return (
    <Switch defaultChecked>
      <SwitchControl />
      <SwitchLabel>Start enabled</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  );
}