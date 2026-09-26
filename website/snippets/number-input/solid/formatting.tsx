import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/solid/number-input';

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
      <NumberInputLabel>Price</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  );
}