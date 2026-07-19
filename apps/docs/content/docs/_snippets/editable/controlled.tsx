/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Editable } from '@moduix/react';
import { useState } from 'react';

export function ControlledEditableDemo() {
  const [value, setValue] = useState('Downtown route');
  return (
    <Editable value={value} onValueChange={(details) => setValue(details.value)}>
      <Editable.Label>Controlled value</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Controls />
    </Editable>
  );
}

//#endregion