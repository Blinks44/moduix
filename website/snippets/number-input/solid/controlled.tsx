import { NumberInput } from '@moduix/solid/number-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/number-input/number-input-controlled.module.css';

export default function ControlledNumberInputDemo() {
  const [value, setValue] = createSignal('24');

  return (
    <div class={styles.root}>
      <NumberInput value={value()} onValueChange={(details) => setValue(details.value)}>
        <NumberInput.Label>Controlled value</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <output>Current value: {value() || 'empty'}</output>
    </div>
  );
}