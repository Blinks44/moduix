/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PinInput } from '@moduix/react';

const placeholder = '*';

export function PlaceholderPinInput() {
  return (
    <PinInput count={6} placeholder="*">
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