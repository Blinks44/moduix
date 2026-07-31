import { NumberInput } from '@moduix/react/number-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ValueTextNumberInputDemo() {
  const [value, setValue] = useState('42');

  return (
    <div>
      <NumberInput defaultValue="42" onValueChange={(details) => setValue(details.value)}>
        <NumberInput.Label>Value preview</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <PreviewMeta style={{ marginInline: 'auto' }}>
        <output>Raw value: {value}</output>
      </PreviewMeta>
    </div>
  );
}