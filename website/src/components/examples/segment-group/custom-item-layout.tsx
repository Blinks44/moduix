import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from '@moduix/react/segment-group';
import styles from '@/components/examples/segment-group/segment-group-custom-item-layout.module.css';

export default function CustomItemLayoutSegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
      <SegmentGroupIndicator />
      {[
        ['Monthly', 'Pay monthly'],
        ['Annual', 'Save 20%'],
      ].map(([item, description]) => (
        <SegmentGroupItem key={item} value={item} asChild>
          <label className={styles.item}>
            <SegmentGroupItemText className={styles.title}>{item}</SegmentGroupItemText>
            <span className={styles.description}>{description}</span>
            <SegmentGroupItemHiddenInput />
          </label>
        </SegmentGroupItem>
      ))}
    </SegmentGroup>
  );
}