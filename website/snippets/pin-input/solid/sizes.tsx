import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@moduix/solid/pin-input';
import { Stack } from '@moduix/solid/stack';
import { For } from 'solid-js';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;

export default function PinInputSizesDemo() {
  return (
    <Stack gap="3">
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
    </Stack>
  );
}