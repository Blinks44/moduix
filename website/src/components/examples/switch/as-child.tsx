import { Switch, SwitchControl, SwitchHiddenInput } from '@moduix/react/switch';
import styles from '@/components/examples/switch/switch-as-child.module.css';

export default function AsChildSwitchDemo() {
  return (
    <Switch asChild defaultChecked>
      <label className={styles.siblingRow}>
        <SwitchControl />
        <span className={styles.label}>Enable reminders</span>
      </label>
      <SwitchHiddenInput />
    </Switch>
  );
}