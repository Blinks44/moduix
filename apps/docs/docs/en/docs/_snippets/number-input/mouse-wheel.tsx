import { NumberInput } from '@moduix/react';

export default function MouseWheelNumberInputDemo() {
  return (
    <NumberInput defaultValue="5" allowMouseWheel>
      <NumberInput.Label>Mouse wheel enabled</NumberInput.Label>
      <NumberInput.Field />
    </NumberInput>
  );
}