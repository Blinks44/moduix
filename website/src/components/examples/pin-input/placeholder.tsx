import { PinInput, PinInputLabel, PinInputControl, PinInputInputs } from '@moduix/react/pin-input';

export default function PlaceholderPinInput() {
  return (
    <PinInput count={6} placeholder="*">
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  );
}