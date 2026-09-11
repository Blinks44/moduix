import { PinInput } from '@moduix/solid/pin-input';

export default function OtpModePinInput() {
  return (
    <PinInput count={6} otp name="verificationCode">
      <PinInput.Label>One-time code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  );
}