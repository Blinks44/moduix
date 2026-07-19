/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Editable, useEditable } from '@moduix/react';

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
        <Editable.Controls />
      </Editable.RootProvider>
      <button type="button" onClick={() => editable.edit()}>
        Edit
      </button>
    </>
  );
}

//#endregion