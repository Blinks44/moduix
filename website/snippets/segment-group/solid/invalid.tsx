import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/solid/segment-group';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export default function InvalidSegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="Framework" name="framework" defaultValue="React" invalid required>
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworks} />
    </SegmentGroup>
  );
}