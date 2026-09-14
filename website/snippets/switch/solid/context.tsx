import { Switch, useSwitchContext } from '@moduix/solid/switch';

function SwitchContextLabel() {
  const switchApi = useSwitchContext();

  return <Switch.Label>Feature is {switchApi().checked ? 'enabled' : 'disabled'}</Switch.Label>;
}

export default function SwitchContextDemo() {
  return (
    <Switch defaultChecked>
      <Switch.Control />
      <SwitchContextLabel />
      <Switch.HiddenInput />
    </Switch>
  );
}