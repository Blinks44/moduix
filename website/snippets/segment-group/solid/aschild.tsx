import { SegmentGroup } from '@moduix/solid/segment-group';
import styles from '@/components/examples/segment-group/segment-group-advanced-customization.module.css';

const billingCycles = [
  ['Monthly', 'Pay monthly'],
  ['Annual', 'Save 20%'],
] as const;

export default function SegmentGroupAsChildDemo() {
  return (
    <SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
      <SegmentGroup.Indicator />
      {billingCycles.map(([item, description]) => (
        <SegmentGroup.Item
          value={item}
          class={styles.item}
          asChild={(props) => <label {...props()} />}
        >
          <>
            <SegmentGroup.ItemText class={styles.title}>{item}</SegmentGroup.ItemText>
            <span class={styles.description}>{description}</span>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </>
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  );
}