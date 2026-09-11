import { NumberInput } from '@moduix/solid/number-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/number-input/number-input-scrubbing.module.css';

export default function NumberInputScrubberDemo() {
  const [value, setValue] = createSignal('250');

  return (
    <div class={styles.root}>
      <NumberInput defaultValue="250" onValueChange={(details) => setValue(details.value)}>
        <NumberInput.Label>Adjust value</NumberInput.Label>
        <NumberInput.Scrubber>Drag left or right to adjust</NumberInput.Scrubber>
        <NumberInput.Field />
      </NumberInput>
      <output>Value: {value()}</output>
    </div>
  );
}