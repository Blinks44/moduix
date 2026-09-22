import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
} from '@moduix/react/switch';

export default function SwitchDemo() {
  return (
    <Switch defaultChecked>
      <SwitchControl />
      <SwitchLabel>Enable notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  );
}