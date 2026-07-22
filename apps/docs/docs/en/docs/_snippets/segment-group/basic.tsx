import { SegmentGroup } from '@moduix/react';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export default function SegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={frameworks} />
    </SegmentGroup>
  );
}