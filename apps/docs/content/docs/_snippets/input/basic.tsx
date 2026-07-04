/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Input } from '@moduix/react';

export function InputDemo() {
  return (
    <Field className="input-demo-field">
      <Field.Label>Name</Field.Label>
      <Field.HelperText>Used in your public workspace profile.</Field.HelperText>
      <Input name="name" placeholder="Enter your name" />
    </Field>
  );
}

//#endregion