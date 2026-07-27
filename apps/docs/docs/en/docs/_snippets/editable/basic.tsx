import { Editable } from '@moduix/react';

export default function EditableDemo() {
  return (
    <Editable
      defaultValue="Layer name"
      translations={{
        input: 'Layer name',
        edit: 'Edit layer name',
        submit: 'Save layer name',
        cancel: 'Cancel layer name',
      }}
    >
      <Editable.Label>Name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Controls />
    </Editable>
  );
}