import { Switch } from '@moduix/react';

export default function SwitchDemo() {
  return (
    <Switch defaultChecked>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch>
  );
}