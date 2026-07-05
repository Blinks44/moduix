/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useEditable, Editable as EditablePrimitive } from '@ark-ui/react/editable';
import { Editable } from '@moduix/react';

export function RootProviderEditableDemo() {
  const editable = useEditable({
    activationMode: 'dblclick',
    defaultValue: 'Root provider value',
  });
  return (
    <>
      <Editable.RootProvider value={editable}>
        <Editable.Label>External state</Editable.Label>
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
      </Editable.RootProvider>
      <button type="button" onClick={() => editable.edit()}>
        Edit
      </button>
    </>
  );
}

//#endregion