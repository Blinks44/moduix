import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from '@moduix/solid/segment-group';
import styles from '@/components/examples/segment-group/segment-group-advanced-customization.module.css';

const billingCycles = [
  ['Monthly', 'Pay monthly'],
  ['Annual', 'Save 20%'],
] as const;

export default function SegmentGroupAsChildDemo() {
  return (
    <SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
      <SegmentGroupIndicator />
      {billingCycles.map(([item, description]) => (
        <SegmentGroupItem
          value={item}
          class={styles.item}
          asChild={(props) => <label {...props()} />}
        >
          <>
            <SegmentGroupItemText class={styles.title}>{item}</SegmentGroupItemText>
            <span class={styles.description}>{description}</span>
            <SegmentGroupItemControl />
            <SegmentGroupItemHiddenInput />
          </>
        </SegmentGroupItem>
      ))}
    </SegmentGroup>
  );
}