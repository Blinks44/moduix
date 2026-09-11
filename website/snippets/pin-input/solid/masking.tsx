import { PinInput } from '@moduix/solid/pin-input';

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