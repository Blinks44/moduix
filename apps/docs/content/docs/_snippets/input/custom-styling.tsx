/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Input } from '@moduix/react';

export function CustomInputDemo() {
  return (
    <Field className="input-demo-field">
      <Field.Label>Project key</Field.Label>
      <Input placeholder="MAPS" className="input-demo-custom-input" />
    </Field>
  );
}

//#endregion