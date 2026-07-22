import { Switch } from '@moduix/react';
import styles from '@/components/examples/switch.module.css';

export default function DisabledSwitchDemo() {
  return (
    <div className={styles.stack}>
      <Switch disabled>
        <Switch.Control />
        <Switch.Label>Enable dark mode</Switch.Label>
      </Switch>
      <Switch defaultChecked disabled>
        <Switch.Control />
        <Switch.Label>Keep me signed in</Switch.Label>
      </Switch>
    </div>
  );
}