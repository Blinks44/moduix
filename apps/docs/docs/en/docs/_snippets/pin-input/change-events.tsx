import { PinInput } from '@moduix/react';
import { useState } from 'react';

export default function ChangeEventsPinInput() {
  const [value, setValue] = useState([] as string[]);
  return (
    <>
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
    </>
  );
}