import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react/segment-group';
import styles from '@/components/examples/segment-group/segment-group-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;
const frameworks = ['React', 'Solid', 'Vue'];

export default function SegmentGroupSizesDemo() {
  return (
    <div className={styles.root}>
      {sizes.map((size) => (
        <SegmentGroup key={size} size={size} aria-label={`Framework, ${size}`} defaultValue="React">
          <SegmentGroupIndicator />
          <SegmentGroupItems items={frameworks} />
        </SegmentGroup>
      ))}
    </div>
  );
}