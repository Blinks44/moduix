import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/solid/number-input';
import { Stack } from '@moduix/solid/stack';
import { For } from 'solid-js';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;

export default function NumberInputSizesDemo() {
  return (
    <Stack align="flex-start" gap="3">
      <For each={sizes}>
        {([size, label]) => (
          <NumberInput size={size} defaultValue="8">
            <NumberInputLabel>{label}</NumberInputLabel>
            <NumberInputField />
          </NumberInput>
        )}
      </For>
    </Stack>
  );
}