import { Switch } from '@moduix/solid/switch';

export default function InitialCheckedSwitchDemo() {
  return (
    <Switch defaultChecked>
      <Switch.Control />
      <Switch.Label>Start enabled</Switch.Label>
      <Switch.HiddenInput />
    </Switch>
  );
}