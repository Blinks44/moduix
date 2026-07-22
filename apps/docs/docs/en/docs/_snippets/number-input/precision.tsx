import { NumberInput } from '@moduix/react';

export default function FractionDigitsNumberInputDemo() {
  return (
    <NumberInput
      defaultValue="12.5"
      step={0.25}
      formatOptions={{
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }}
    >
      <NumberInput.Label>Hours</NumberInput.Label>
      <NumberInput.Field />
    </NumberInput>
  );
}