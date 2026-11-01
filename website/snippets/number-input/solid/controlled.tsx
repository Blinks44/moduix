import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/solid/number-input';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

export default function ControlledNumberInputDemo() {
  const [value, setValue] = createSignal('24');

  return (
    <Stack align="center">
      <NumberInput value={value()} onValueChange={(details) => setValue(details.value)}>
        <NumberInputLabel>Controlled value</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <output>Current value: {value() || 'empty'}</output>
    </Stack>
  );
}