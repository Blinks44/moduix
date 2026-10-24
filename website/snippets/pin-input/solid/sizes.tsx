import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@moduix/solid/pin-input';
import { For } from 'solid-js';
import styles from '@/components/examples/pin-input/pin-input-sizes.module.css';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;

export default function PinInputSizesDemo() {
  return (
    <div class={styles.root}>
      <For each={sizes}>
        {([size, label]) => (
          <PinInput count={4} size={size}>
            <PinInputLabel>{label}</PinInputLabel>
            <PinInputControl>
              <PinInputInputs />
            </PinInputControl>
          </PinInput>
        )}
      </For>
    </div>
  );
}