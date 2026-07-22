import { NumberInput } from '@moduix/react';

export default function ValueTextNumberInputDemo() {
  return (
    <NumberInput defaultValue="42">
      <NumberInput.Label>Value preview</NumberInput.Label>
      <NumberInput.Field />
      <NumberInput.ValueText />
    </NumberInput>
  );
}