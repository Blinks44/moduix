import { PinInput } from '@moduix/react/pin-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ChangeEventsPinInput() {
  const [value, setValue] = useState([] as string[]);
  return (
    <div
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--moduix-spacing-4)',
      }}
    >
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
      <PreviewMeta>
        <output>Current value: {value.join('') || 'empty'}</output>
      </PreviewMeta>
    </div>
  );
}