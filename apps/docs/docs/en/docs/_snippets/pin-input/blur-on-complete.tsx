import { PinInput } from '@moduix/react';
import { useState } from 'react';

export default function BlurOnCompletePinInput() {
  const [, setCompletedValue] = useState('');
  return (
    <PinInput
      count={6}
      blurOnComplete
      onValueComplete={(details) => {
        setCompletedValue(details.valueAsString);
      }}
    >
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  );
}