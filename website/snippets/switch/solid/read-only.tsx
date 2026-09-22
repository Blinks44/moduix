import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
} from '@moduix/solid/switch';
import styles from '@/components/examples/switch/switch-read-only.module.css';

export default function ReadOnlySwitchDemo() {
  return (
    <div class={styles.column}>
      <Switch readOnly>
        <SwitchControl />
        <SwitchLabel>Managed by policy</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <Switch defaultChecked readOnly>
        <SwitchControl />
        <SwitchLabel>Always on</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    </div>
  );
}