import { NumberInput } from '@moduix/react/number-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledNumberInputDemo() {
  const [value, setValue] = useState('24');
  return (
    <div>
      <NumberInput value={value} onValueChange={(details) => setValue(details.value)}>
        <NumberInput.Label>Controlled value</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <PreviewMeta style={{ marginInline: 'auto' }}>
        <output>Current value: {value || 'empty'}</output>
      </PreviewMeta>
    </div>
  );
}