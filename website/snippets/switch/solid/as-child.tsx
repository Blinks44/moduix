import { Switch, SwitchControl, SwitchHiddenInput } from '@moduix/solid/switch';
import styles from '@/components/examples/switch/switch-as-child.module.css';

export default function AsChildSwitchDemo() {
  return (
    <Switch asChild={(props) => <label {...props()} class={styles.siblingRow} />} defaultChecked>
      <SwitchControl />
      <span class={styles.label}>Enable reminders</span>
      <SwitchHiddenInput />
    </Switch>
  );
}