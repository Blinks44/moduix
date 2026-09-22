import { PinInput, PinInputLabel, PinInputControl, PinInputInputs } from '@moduix/react/pin-input';

export default function BlurOnCompletePinInput() {
  return (
    <PinInput count={6} blurOnComplete>
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  );
}
