/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Editable } from '@moduix/react';

export function EditableDemo() {
  return (
    <Editable defaultValue="Layer name">
      <Editable.Label>Name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Controls />
    </Editable>
  );
}

//#endregion