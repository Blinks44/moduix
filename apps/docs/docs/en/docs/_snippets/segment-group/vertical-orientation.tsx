import { SegmentGroup } from '@moduix/react';

const views = [
  { value: 'List', label: 'List' },
  { value: 'Board', label: 'Board' },
  { value: 'Calendar', label: 'Calendar' },
];

export default function VerticalSegmentGroupDemo() {
  return (
    <SegmentGroup
      aria-label="View"
      defaultValue="List"
      orientation="vertical"
      className="segment-vertical"
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={views} />
    </SegmentGroup>
  );
}