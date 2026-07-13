/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PinInput } from '@moduix/react';
import { useState } from 'react';

export function ChangeEventsPinInput() {
  const [value, setValue] = useState([] as string[]);
  return (
    <div>
      <PinInput
        count={6}
        type="alphanumeric"
        value={value}
        onValueChange={(details) => {
          setValue(details.value);
        }}
      >
        <PinInput.Label>Invite code</PinInput.Label>
        <PinInput.Control>
          <PinInput.Inputs />
        </PinInput.Control>
      </PinInput>
      <span className="hint">Current value: {value.join('') || 'empty'}</span>
    </div>
  );
}

//#endregion