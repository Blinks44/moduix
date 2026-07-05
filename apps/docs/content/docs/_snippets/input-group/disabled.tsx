/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { InputGroup } from '@moduix/react';

const workspaceHandle = 'maps';

export function DisabledInputGroupDemo() {
  return (
    <InputGroup role="group" aria-label="Workspace handle">
      <InputGroup.Addon>@</InputGroup.Addon>
      <InputGroup.Input disabled value={workspaceHandle} />
      <InputGroup.Button disabled>Copy</InputGroup.Button>
    </InputGroup>
  );
}

//#endregion