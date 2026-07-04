/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Editable } from '@moduix/react';

export function CustomStylesEditableDemo() {
  return (
    <Editable defaultValue="Custom area">
      <Editable.Label>Styled editable</Editable.Label>
      <Editable.Area className="editable-custom-area">
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Control>
        <Editable.EditTrigger />
      </Editable.Control>
    </Editable>
  );
}

//#endregion