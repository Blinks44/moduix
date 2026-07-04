/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PinInput } from '@moduix/react';

const name = 'verificationCode';

export function OtpModePinInput() {
  return (
    <PinInput count={6} otp name="verificationCode">
      <PinInput.Label>One-time code</PinInput.Label>
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