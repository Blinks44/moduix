import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
} from '@moduix/react/switch';
import styles from '@/components/examples/switch/switch-disabled.module.css';

export default function DisabledSwitchDemo() {
  return (
    <div className={styles.stack}>
      <Switch disabled>
        <SwitchControl />
        <SwitchLabel>Enable dark mode</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <Switch defaultChecked disabled>
        <SwitchControl />
        <SwitchLabel>Keep me signed in</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    </div>
  );
}