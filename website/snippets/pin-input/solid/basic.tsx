import { PinInput } from '@moduix/solid/pin-input';

export default function PinInputDemo() {
  return (
    <PinInput count={6}>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  );
}