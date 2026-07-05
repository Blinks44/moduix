/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Input } from '@moduix/react';

export function InputAsChildDemo() {
  return (
    <Field className="input-demo-field">
      <Field.Label>Repository</Field.Label>
      <Input asChild>
        <input name="repository" placeholder="owner/project" />
      </Input>
    </Field>
  );
}

//#endregion