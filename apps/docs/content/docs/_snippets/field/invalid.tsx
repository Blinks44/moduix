/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field } from '@moduix/react';

export function InvalidFieldDemo() {
  return (
    <Field invalid required>
      <Field.Label>Email</Field.Label>
      <Field.Input type="email" placeholder="name@example.com" />
      <Field.HelperText>Use your work email.</Field.HelperText>
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  );
}

//#endregion