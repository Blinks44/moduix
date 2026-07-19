/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Editable, Field } from '@moduix/react';

export function FieldEditableDemo() {
  return (
    <Field invalid>
      <Editable defaultValue="" placeholder="Click to edit your bio" required>
        <Editable.Label>Bio</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable>
      <Field.ErrorText>Bio is required.</Field.ErrorText>
    </Field>
  );
}

//#endregion