import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from '@moduix/react/segment-group';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export default function BuildFromPartsSegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroupIndicator />
      {frameworks.map((framework) => (
        <SegmentGroupItem key={framework} value={framework}>
          <SegmentGroupItemText>{framework}</SegmentGroupItemText>
          <SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
      ))}
    </SegmentGroup>
  );
}