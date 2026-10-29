import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchThumb,
} from '@moduix/solid/switch';

export default function BuildFromPartsSwitchDemo() {
  return (
    <Switch defaultChecked>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>Enable notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  );
}