import { PinInput, PinInputLabel, PinInputControl, PinInputInputs } from '@moduix/react/pin-input';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

export default function ChangeEventsPinInput() {
  const [value, setValue] = useState([] as string[]);
  return (
    <Stack align="center" gap="4">
      <PinInput
        count={6}
        type="alphanumeric"
        value={value}
        onValueChange={(details) => {
          setValue(details.value);
        }}
      >
        <PinInputLabel>Invite code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
      </PinInput>
      <div data-preview-meta>
        <output>Current value: {value.join('') || 'empty'}</output>
      </div>
    </Stack>
  );
}