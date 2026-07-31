import { NumberInput } from '@moduix/react/number-input';

export default function NumberInputDemo() {
  return (
    <NumberInput defaultValue="100">
      <NumberInput.Label>Amount</NumberInput.Label>
      <NumberInput.Field />
    </NumberInput>
  );
}