import { Switch } from '@moduix/react';
import styles from '@/components/examples/switch.module.css';

export default function ReadOnlySwitchDemo() {
  return (
    <div className={styles.stack}>
      <Switch readOnly>
        <Switch.Control />
        <Switch.Label>Managed by policy</Switch.Label>
      </Switch>
      <Switch defaultChecked readOnly>
        <Switch.Control />
        <Switch.Label>Always on</Switch.Label>
      </Switch>
    </div>
  );
}