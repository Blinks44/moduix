/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field } from '@moduix/react';

const placeholder = 'Enter your name';
const required = true;
export function FieldDemo() {
  return (
    <Field required>
      <Field.Label>
        Name
        <Field.RequiredIndicator />
      </Field.Label>
      <Field.Input placeholder="Enter your name" />
      <Field.HelperText>Visible on your public profile.</Field.HelperText>
    </Field>
  );
}

//#endregion