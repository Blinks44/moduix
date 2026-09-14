import { PinInput } from '@moduix/react/pin-input';

export default function BlurOnCompletePinInput() {
  return (
    <PinInput count={6} blurOnComplete>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  );
}