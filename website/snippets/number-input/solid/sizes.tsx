import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/solid/number-input';
import { For } from 'solid-js';
import styles from '@/components/examples/number-input/number-input-sizes.module.css';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;

export default function NumberInputSizesDemo() {
  return (
    <div class={styles.root}>
      <For each={sizes}>
        {([size, label]) => (
          <NumberInput size={size} defaultValue="8">
            <NumberInputLabel>{label}</NumberInputLabel>
            <NumberInputField />
          </NumberInput>
        )}
      </For>
    </div>
  );
}