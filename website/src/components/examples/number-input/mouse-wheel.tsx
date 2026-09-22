import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/react/number-input';

export default function MouseWheelNumberInputDemo() {
  return (
    <NumberInput defaultValue="5" allowMouseWheel>
      <NumberInputLabel>Mouse wheel enabled</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  );
}