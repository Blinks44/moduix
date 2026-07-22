import { SegmentGroup } from '@moduix/react';
import { useState } from 'react';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export default function ControlledSegmentGroupDemo() {
  const [value, setValue] = useState('React' as string | null);
  return (
    <div className="segment-stack">
      <SegmentGroup
        aria-label="Framework"
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworks} />
      </SegmentGroup>
      <output className="segment-output">selected: {value ?? 'none'}</output>
    </div>
  );
}