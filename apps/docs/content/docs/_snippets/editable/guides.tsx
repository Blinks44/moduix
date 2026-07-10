/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Editable } from '@moduix/react';

const maxLength = 24;
export function EditableGuidesDemo() {
  return (
    <Editable
      defaultValue="Route"
      activationMode="click"
      autoResize
      maxLength={24}
      placeholder={{
        preview: 'Click to edit',
        edit: 'Type a short name',
      }}
      translations={{
        input: 'Route name',
        edit: 'Edit route name',
        submit: 'Save route name',
        cancel: 'Cancel route name',
      }}
    >
      <Editable.Label>Auto-resizing name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Controls />
    </Editable>
  );
}

//#endregion