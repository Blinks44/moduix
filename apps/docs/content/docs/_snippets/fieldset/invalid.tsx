/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Fieldset } from '@moduix/react';

export function InvalidFieldset() {
  return (
    <Fieldset className="fieldset" invalid>
      <Fieldset.Legend>Account information</Fieldset.Legend>
      <Fieldset.ErrorText>Please fix the errors below to continue.</Fieldset.ErrorText>
      <Field invalid>
        <Field.Label>Username</Field.Label>
        <Field.Input defaultValue="jo" />
        <Field.ErrorText>Username must be at least 3 characters.</Field.ErrorText>
      </Field>
      <Field invalid>
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" defaultValue="invalid-email" />
        <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
      </Field>
    </Fieldset>
  );
}

//#endregion