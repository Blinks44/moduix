import { NumberInput, NumberInputField, NumberInputLabel, NumberInputScrubber } from '@moduix/solid/number-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/number-input/number-input-scrubbing.module.css';

export default function NumberInputScrubberDemo() {
  const [value, setValue] = createSignal('250');

  return (
    <div class={styles.root}>
      <NumberInput defaultValue="250" onValueChange={(details) => setValue(details.value)}>
        <NumberInputLabel>Adjust value</NumberInputLabel>
        <NumberInputScrubber>Drag left or right to adjust</NumberInputScrubber>
        <NumberInputField />
      </NumberInput>
      <output>Value: {value()}</output>
    </div>
  );
}
