import { PinInput } from '@moduix/react';

export default function PinInputDemo() {
  return (
    <PinInput count={6}>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  );
}