import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react/segment-group';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export default function SegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworks} />
    </SegmentGroup>
  );
}