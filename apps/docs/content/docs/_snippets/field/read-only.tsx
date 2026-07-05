/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field } from '@moduix/react';

const readOnly = true;
export function ReadOnlyFieldDemo() {
  return (
    <Field readOnly>
      <Field.Label>Workspace key</Field.Label>
      <Field.Input defaultValue="MAPS" />
      <Field.HelperText>Read-only state is propagated to the input.</Field.HelperText>
    </Field>
  );
}

//#endregion