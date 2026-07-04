/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, InputGroup } from '@moduix/react';

const repositoryOwner = 'moduix/';

export function InputGroupAsChildDemo() {
  return (
    <Field className="input-group-demo-field">
      <Field.Label>Repository</Field.Label>
      <InputGroup asChild>
        <div>
          <InputGroup.Addon>{repositoryOwner}</InputGroup.Addon>
          <InputGroup.Input placeholder="components" />
        </div>
      </InputGroup>
    </Field>
  );
}

//#endregion