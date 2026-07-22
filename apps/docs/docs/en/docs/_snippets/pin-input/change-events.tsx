import { PinInput } from '@moduix/react';
import { useState } from 'react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function ChangeEventsPinInput() {
  const [value, setValue] = useState([] as string[]);
  return (
    <PreviewLayout align="start" gap="var(--moduix-spacing-2)">
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
    </PreviewLayout>
  );
}