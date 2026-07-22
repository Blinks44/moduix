import { PinInput } from '@moduix/react';

export default function MaskedPinInput() {
  return (
    <PinInput count={4} mask>
      <PinInput.Label>PIN</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  );
}