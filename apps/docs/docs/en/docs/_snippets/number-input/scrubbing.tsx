import { NumberInput } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function NumberInputScrubberDemo() {
  const [value, setValue] = useState('250');

  return (
    <div>
      <NumberInput defaultValue="250" onValueChange={(details) => setValue(details.value)}>
        <NumberInput.Label>Adjust value</NumberInput.Label>
        <NumberInput.Scrubber>Drag left or right to adjust</NumberInput.Scrubber>
        <NumberInput.Field />
      </NumberInput>
      <PreviewMeta style={{ marginInline: 'auto' }}>
        <output>Value: {value}</output>
      </PreviewMeta>
    </div>
  );
}