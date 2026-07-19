/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Editable } from '@moduix/react';

export function AdvancedEditableCustomizationDemo() {
  return (
    <Editable defaultValue="Service area">
      <Editable.Label>Name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Context>
        {(editable) =>
          editable.editing ? (
            <span>Enter to save, Esc to cancel.</span>
          ) : (
            <Editable.Control>
              <Editable.EditTrigger />
            </Editable.Control>
          )
        }
      </Editable.Context>
    </Editable>
  );
}

//#endregion