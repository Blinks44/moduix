/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Editable as EditablePrimitive } from '@ark-ui/react/editable';
import { Editable } from '@moduix/react';

export function ContextEditableDemo() {
  return (
    <Editable defaultValue="Service area">
      <Editable.Label>Name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <EditablePrimitive.Context>
        {(editable) =>
          editable.editing ? (
            <span>Enter to save, Esc to cancel.</span>
          ) : (
            <Editable.Control>
              <Editable.EditTrigger />
            </Editable.Control>
          )
        }
      </EditablePrimitive.Context>
    </Editable>
  );
}

//#endregion