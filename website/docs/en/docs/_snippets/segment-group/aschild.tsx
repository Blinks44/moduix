import { SegmentGroup } from '@moduix/react/segment-group';
import styles from '@/components/examples/segment-group/segment-group-advanced-customization.module.css';

export default function SegmentGroupAsChildDemo() {
  return (
    <SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
      <SegmentGroup.Indicator />
      {[
        ['Monthly', 'Pay monthly'],
        ['Annual', 'Save 20%'],
      ].map(([item, description]) => (
        <SegmentGroup.Item key={item} value={item} asChild>
          <label className={styles.item}>
            <SegmentGroup.ItemText className={styles.title}>{item}</SegmentGroup.ItemText>
            <span className={styles.description}>{description}</span>
            <SegmentGroup.ItemControl />
          </label>
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  );
}