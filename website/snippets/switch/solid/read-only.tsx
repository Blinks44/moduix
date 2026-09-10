import { Switch } from '@moduix/solid/switch';
import styles from '@/components/examples/switch/switch-read-only.module.css';

export default function ReadOnlySwitchDemo() {
  return (
    <div class={styles.column}>
      <Switch readOnly>
        <Switch.Control />
        <Switch.Label>Managed by policy</Switch.Label>
        <Switch.HiddenInput />
      </Switch>
      <Switch defaultChecked readOnly>
        <Switch.Control />
        <Switch.Label>Always on</Switch.Label>
        <Switch.HiddenInput />
      </Switch>
    </div>
  );
}