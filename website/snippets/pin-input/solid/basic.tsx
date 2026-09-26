import {
  PinInput,
  PinInputHiddenInput,
  PinInputLabel,
  PinInputControl,
  PinInputInputs,
} from '@moduix/solid/pin-input';

export default function PinInputDemo() {
  return (
    <PinInput count={6}>
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
      <PinInputHiddenInput />
    </PinInput>
  );
}