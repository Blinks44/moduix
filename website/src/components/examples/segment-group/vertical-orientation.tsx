import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react/segment-group';
import styles from '@/components/examples/segment-group/segment-group-vertical-orientation.module.css';

const views = ['List', 'Board', 'Calendar'];

export default function VerticalSegmentGroupDemo() {
  return (
    <SegmentGroup
      aria-label="View"
      defaultValue="List"
      orientation="vertical"
      className={styles.root}
    >
      <SegmentGroupIndicator />
      <SegmentGroupItems items={views} />
    </SegmentGroup>
  );
}