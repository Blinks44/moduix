/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Input } from '@moduix/react';

export function InvalidInputDemo() {
  return (
    <Field className="input-demo-field" invalid>
      <Field.Label>Email</Field.Label>
      <Input type="email" placeholder="name@example.com" />
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  );
}

//#endregion