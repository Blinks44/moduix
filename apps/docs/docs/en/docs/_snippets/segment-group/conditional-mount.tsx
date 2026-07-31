import { Button } from '@moduix/react/button';
import { SegmentGroup } from '@moduix/react/segment-group';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export default function ConditionalSegmentGroupDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="segment-stack">
      {visible ? (
        <SegmentGroup aria-label="Framework" defaultValue="React">
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={frameworks} />
        </SegmentGroup>
      ) : null}
      <PreviewMeta>
        <output>Segment group: {visible ? 'visible' : 'hidden'}</output>
        <Button type="button" size="sm" onClick={() => setVisible((value) => !value)}>
          {visible ? 'Hide' : 'Show'}
        </Button>
      </PreviewMeta>
    </div>
  );
}