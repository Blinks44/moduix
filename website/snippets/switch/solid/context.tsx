import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  useSwitchContext,
} from '@moduix/solid/switch';

function SwitchContextLabel() {
  const switchApi = useSwitchContext();

  return <SwitchLabel>Feature is {switchApi().checked ? 'enabled' : 'disabled'}</SwitchLabel>;
}

export default function SwitchContextDemo() {
  return (
    <Switch defaultChecked>
      <SwitchControl />
      <SwitchContextLabel />
      <SwitchHiddenInput />
    </Switch>
  );
}