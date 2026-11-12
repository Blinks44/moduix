import {
  NumberInput,
  NumberInputField,
  NumberInputLabel,
  NumberInputScrubber,
} from '@moduix/solid/number-input';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

export default function NumberInputScrubberDemo() {
  const [value, setValue] = createSignal('250');

  return (
    <Stack align="center">
      <NumberInput defaultValue="250" onValueChange={(details) => setValue(details.value)}>
        <NumberInputLabel>Adjust value</NumberInputLabel>
        <NumberInputScrubber>Drag left or right to adjust</NumberInputScrubber>
        <NumberInputField />
      </NumberInput>
      <div data-preview-meta>
        <output>Value: {value()}</output>
      </div>
    </Stack>
  );
}