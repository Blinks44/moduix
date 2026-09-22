import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/solid/segment-group';
import styles from '@/components/examples/segment-group/segment-group-vertical-orientation.module.css';

const views = [
  { value: 'List', label: 'List' },
  { value: 'Board', label: 'Board' },
  { value: 'Calendar', label: 'Calendar' },
];

export default function VerticalSegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="View" defaultValue="List" orientation="vertical" class={styles.root}>
      <SegmentGroupIndicator />
      <SegmentGroupItems items={views} />
    </SegmentGroup>
  );
}