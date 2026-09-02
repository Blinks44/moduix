import { Switch } from '@moduix/react/switch';

export default function InitialCheckedSwitchDemo() {
  return (
    <Switch defaultChecked>
      <Switch.Control />
      <Switch.Label>Start enabled</Switch.Label>
    </Switch>
  );
}