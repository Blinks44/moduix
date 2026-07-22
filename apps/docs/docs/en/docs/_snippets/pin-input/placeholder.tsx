import { PinInput } from '@moduix/react';

export default function PlaceholderPinInput() {
  return (
    <PinInput count={6} placeholder="*">
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  );
}