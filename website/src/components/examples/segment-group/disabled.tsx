import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react/segment-group';
import styles from '@/components/examples/segment-group/segment-group-disabled.module.css';

const frameworks = ['React', 'Solid', { value: 'Svelte', label: 'Svelte', disabled: true }, 'Vue'];

export default function DisabledSegmentGroupDemo() {
  return (
    <div className={styles.root}>
      <SegmentGroup aria-label="Framework with unavailable item" defaultValue="React">
        <SegmentGroupIndicator />
        <SegmentGroupItems items={frameworks} />
      </SegmentGroup>
      <SegmentGroup aria-label="Disabled framework" defaultValue="React" disabled>
        <SegmentGroupIndicator />
        <SegmentGroupItems items={frameworks} />
      </SegmentGroup>
    </div>
  );
}