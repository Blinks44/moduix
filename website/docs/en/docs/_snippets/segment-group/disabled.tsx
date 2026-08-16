import { SegmentGroup } from '@moduix/react/segment-group';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte', disabled: true },
  { value: 'Vue', label: 'Vue' },
];

export default function DisabledSegmentGroupDemo() {
  return (
    <div className="segment-stack">
      <SegmentGroup aria-label="Framework with unavailable item" defaultValue="React">
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworks} />
      </SegmentGroup>
      <SegmentGroup aria-label="Disabled framework" defaultValue="React" disabled>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworks} />
      </SegmentGroup>
    </div>
  );
}