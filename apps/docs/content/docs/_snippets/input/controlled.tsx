/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Input } from '@moduix/react';
import { useState } from 'react';

export function ControlledInputDemo() {
  const [value, setValue] = useState('');
  return (
    <Field className="input-demo-field">
      <Field.Label>Username</Field.Label>
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Type to control value"
      />
    </Field>
  );
}

//#endregion