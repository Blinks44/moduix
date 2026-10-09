import {
  PinInput,
  PinInputHiddenInput,
  PinInputLabel,
  PinInputControl,
  PinInputInputs,
} from '@moduix/react/pin-input';

export default function OtpModePinInput() {
  return (
    <PinInput count={6} otp name="verificationCode">
      <PinInputLabel>One-time code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
      <PinInputHiddenInput />
    </PinInput>
  );
}