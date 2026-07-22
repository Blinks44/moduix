import { SegmentGroup } from '@moduix/react';
import { useState } from 'react';

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
      <button
        className="segment-button"
        type="button"
        onClick={() => setVisible((value) => !value)}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
      {visible ? (
        <SegmentGroup aria-label="Framework" defaultValue="React">
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={frameworks} />
        </SegmentGroup>
      ) : null}
    </div>
  );
}