/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PinInput } from '@moduix/react';

const count = 6;

export function PinInputDemo() {
  return (
    <PinInput count={6}>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  );
}

//#endregion