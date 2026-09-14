import { Switch } from '@moduix/solid/switch';

export default function SwitchDemo() {
  return (
    <Switch defaultChecked>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
      <Switch.HiddenInput />
    </Switch>
  );
}