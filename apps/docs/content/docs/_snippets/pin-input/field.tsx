/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, PinInput } from '@moduix/react';

const invalid = true;

export function FieldPinInput() {
  return (
    <Field invalid required>
      <PinInput count={6}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInput.Inputs />
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput>
      <Field.HelperText>Additional info</Field.HelperText>
      <Field.ErrorText>Please enter the verification code.</Field.ErrorText>
    </Field>
  );
}

//#endregion