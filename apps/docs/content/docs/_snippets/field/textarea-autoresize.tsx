/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field } from '@moduix/react';

const autoresize = true;
export function TextareaAutoresizeFieldDemo() {
  return (
    <Field>
      <Field.Label>Details</Field.Label>
      <Field.Textarea autoresize placeholder="Add extra context" />
      <Field.HelperText>The textarea grows as the user types.</Field.HelperText>
    </Field>
  );
}

//#endregion