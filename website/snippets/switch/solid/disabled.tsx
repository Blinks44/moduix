import { Switch } from '@moduix/solid/switch';
import styles from '@/components/examples/switch/switch-disabled.module.css';

export default function DisabledSwitchDemo() {
  return (
    <div class={styles.stack}>
      <Switch disabled>
        <Switch.Control />
        <Switch.Label>Enable dark mode</Switch.Label>
        <Switch.HiddenInput />
      </Switch>
      <Switch defaultChecked disabled>
        <Switch.Control />
        <Switch.Label>Keep me signed in</Switch.Label>
        <Switch.HiddenInput />
      </Switch>
    </div>
  );
}