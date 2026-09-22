import { PinInput, PinInputLabel, PinInputControl, PinInputInputs } from '@moduix/solid/pin-input';

export default function MaskedPinInput() {
  return (
    <PinInput count={4} mask>
      <PinInputLabel>PIN</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  );
}
