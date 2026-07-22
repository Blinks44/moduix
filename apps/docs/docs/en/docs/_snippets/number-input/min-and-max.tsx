import { NumberInput } from '@moduix/react';

export default function MinMaxNumberInputDemo() {
  return (
    <NumberInput defaultValue="10" min={0} max={20} step={2}>
      <NumberInput.Label>Quantity (0-20, step 2)</NumberInput.Label>
      <NumberInput.Field />
    </NumberInput>
  );
}