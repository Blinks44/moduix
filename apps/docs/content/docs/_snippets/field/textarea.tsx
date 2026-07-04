/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field } from '@moduix/react';

const placeholder = 'Describe the request';
export function TextareaFieldDemo() {
  return (
    <Field>
      <Field.Label>Summary</Field.Label>
      <Field.Textarea placeholder="Describe the request" />
      <Field.HelperText>Use a short operational summary.</Field.HelperText>
    </Field>
  );
}

//#endregion