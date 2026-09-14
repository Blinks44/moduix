import { Checkbox } from '@moduix/solid/checkbox';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/checkbox/checkbox-controlled.module.css';

export default function ControlledCheckboxDemo() {
  const [checked, setChecked] = createSignal(true);

  return (
    <div class={styles.root}>
      <Checkbox
        checked={checked()}
        onCheckedChange={(details) => setChecked(details.checked === true)}
      >
        <Checkbox.Control />
        <Checkbox.Label>{checked() ? 'Enabled' : 'Disabled'}</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox>
      <output>Notifications: {checked() ? 'enabled' : 'disabled'}</output>
    </div>
  );
}