import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/solid/number-input';

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
      <NumberInputLabel>Hours</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  );
}