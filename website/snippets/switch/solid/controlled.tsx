import { Switch } from '@moduix/solid/switch';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/switch/switch-controlled.module.css';

export default function ControlledSwitchDemo() {
  const [checked, setChecked] = createSignal(true);

  return (
    <div class={styles.stack}>
      <Switch checked={checked()} onCheckedChange={(details) => setChecked(details.checked)}>
        <Switch.Control />
        <Switch.Label>{checked() ? 'On' : 'Off'}</Switch.Label>
        <Switch.HiddenInput />
      </Switch>
      <output>Current value: {String(checked())}</output>
    </div>
  );
}