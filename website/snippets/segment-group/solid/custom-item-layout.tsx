import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from '@moduix/solid/segment-group';
import styles from '@/components/examples/segment-group/segment-group-custom-item-layout.module.css';

const billingCycles = [
  ['Monthly', 'Pay monthly'],
  ['Annual', 'Save 20%'],
] as const;

export default function CustomItemLayoutSegmentGroupDemo() {
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
            <SegmentGroupItemHiddenInput />
          </>
        </SegmentGroupItem>
      ))}
    </SegmentGroup>
  );
}