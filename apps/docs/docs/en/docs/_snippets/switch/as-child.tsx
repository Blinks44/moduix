import { Switch } from '@moduix/react';
import styles from '@/components/examples/switch.module.css';

export default function AsChildSwitchDemo() {
  return (
    <Switch asChild defaultChecked>
      <label className={styles.siblingRow}>
        <Switch.Control />
        <span className={styles.label}>Enable reminders</span>
      </label>
    </Switch>
  );
}