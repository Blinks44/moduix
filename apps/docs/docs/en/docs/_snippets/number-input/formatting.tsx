import { NumberInput } from '@moduix/react';

export default function FormattedNumberInputDemo() {
  return (
    <NumberInput
      defaultValue="1250"
      min={0}
      step={50}
      formatOptions={{
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }}
    >
      <NumberInput.Label>Price</NumberInput.Label>
      <NumberInput.Field />
    </NumberInput>
  );
}