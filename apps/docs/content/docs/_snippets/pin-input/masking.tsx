/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PinInput } from '@moduix/react';

const count = 4;

export function MaskedPinInput() {
  return (
    <PinInput count={4} mask>
      <PinInput.Label>PIN</PinInput.Label>
      <PinInput.Control>
        {[0, 1, 2, 3].map((index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  );
}

//#endregion