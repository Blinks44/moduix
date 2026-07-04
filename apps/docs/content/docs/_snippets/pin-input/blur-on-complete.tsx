/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PinInput } from '@moduix/react';
import { useState } from 'react';

export function BlurOnCompletePinInput() {
  const [completedValue, setCompletedValue] = useState('');
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
        {Array.from(
          {
            length: 6,
          },
          (_, index) => (
            <PinInput.Input key={index} index={index} />
          ),
        )}
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  );
}

//#endregion