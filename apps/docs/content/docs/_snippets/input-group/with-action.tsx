/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, InputGroup } from '@moduix/react';
import { useState } from 'react';

const initialInviteEmail = '';

export function InputGroupWithActionDemo() {
  const [value, setValue] = useState(initialInviteEmail);
  return (
    <Field className="input-group-demo-field">
      <Field.Label>Invite by email</Field.Label>
      <InputGroup>
        <InputGroup.Input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          type="email"
          placeholder="name@example.com"
        />
        <InputGroup.Button disabled={!value}>Send</InputGroup.Button>
      </InputGroup>
    </Field>
  );
}

//#endregion