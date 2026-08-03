import { SegmentGroup } from '@moduix/react/segment-group';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

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
      <PreviewMeta>
        <output>Selected: {value ?? 'none'}</output>
      </PreviewMeta>
    </div>
  );
}