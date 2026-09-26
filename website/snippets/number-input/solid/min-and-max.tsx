import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/solid/number-input';

export default function MinMaxNumberInputDemo() {
  return (
    <NumberInput defaultValue="10" min={0} max={20} step={2}>
      <NumberInputLabel>Quantity (0-20, step 2)</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  );
}