/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, InputGroup } from '@moduix/react';

const workspacePrefix = '@';

export function InputGroupDemo() {
  return (
    <Field className="input-group-demo-field">
      <Field.Label>Workspace</Field.Label>
      <InputGroup>
        <InputGroup.Addon>{workspacePrefix}</InputGroup.Addon>
        <InputGroup.Input name="workspace" placeholder="maps" />
      </InputGroup>
    </Field>
  );
}

//#endregion