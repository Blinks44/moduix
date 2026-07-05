/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Editable as EditablePrimitive } from '@ark-ui/react/editable';
import { Editable } from '@moduix/react';

export function EditableControlsDemo() {
  return (
    <Editable defaultValue="Transit corridor" submitMode="none">
      <Editable.Label>Project title</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Control>
        <EditablePrimitive.Context>
          {(editable) =>
            editable.editing ? (
              <>
                <Editable.SubmitTrigger />
                <Editable.CancelTrigger />
              </>
            ) : (
              <Editable.EditTrigger />
            )
          }
        </EditablePrimitive.Context>
      </Editable.Control>
    </Editable>
  );
}

//#endregion