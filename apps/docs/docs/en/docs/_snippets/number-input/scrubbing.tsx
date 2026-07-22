import { NumberInput } from '@moduix/react';

export default function NumberInputScrubberDemo() {
  return (
    <NumberInput defaultValue="250">
      <NumberInput.Label>Drag to scrub</NumberInput.Label>
      <NumberInput.Scrubber>Drag</NumberInput.Scrubber>
      <NumberInput.Field />
    </NumberInput>
  );
}