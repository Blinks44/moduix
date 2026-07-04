/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field } from '@moduix/react';

const disabled = true;
export function DisabledFieldDemo() {
  return (
    <Field disabled>
      <Field.Label>Organization</Field.Label>
      <Field.Input placeholder="Acme Inc." />
      <Field.HelperText>This field is currently managed by your workspace.</Field.HelperText>
    </Field>
  );
}

//#endregion