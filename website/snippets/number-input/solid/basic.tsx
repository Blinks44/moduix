import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/solid/number-input';

export default function NumberInputDemo() {
  return (
    <NumberInput defaultValue="100">
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  );
}
