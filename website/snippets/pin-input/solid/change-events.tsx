import { PinInput, PinInputLabel, PinInputControl, PinInputInputs } from '@moduix/solid/pin-input';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

export default function ChangeEventsPinInput() {
  const [value, setValue] = createSignal<string[]>([]);

  return (
    <Stack align="center" gap="4">
      <PinInput
        count={6}
        type="alphanumeric"
        value={value()}
        onValueChange={(details) => setValue(details.value)}
      >
        <PinInputLabel>Invite code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
      </PinInput>
      <output>Current value: {value().join('') || 'empty'}</output>
    </Stack>
  );
}