/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Editable as EditablePrimitive } from '@ark-ui/react/editable';
import { Editable } from '@moduix/react';

export function TextareaEditableDemo() {
  return (
    <Editable
      className="editable-textarea-root"
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submitMode="none"
      placeholder="Enter a description"
    >
      <Editable.Label>Description</Editable.Label>
      <Editable.Area className="editable-textarea-area">
        <Editable.Input asChild className="editable-textarea-input">
          <textarea />
        </Editable.Input>
        <Editable.Preview className="editable-textarea-preview" />
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