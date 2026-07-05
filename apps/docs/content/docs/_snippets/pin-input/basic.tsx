/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PinInput } from '@moduix/react';

const count = 6;

export function PinInputDemo() {
  return (
    <PinInput count={6}>
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