<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItem,
    SegmentGroupItemHiddenInput,
    SegmentGroupItemText,
  } from '@moduix/svelte/segment-group';
  import styles from '@/components/examples/segment-group/segment-group-custom-item-layout.module.css';

  const billingCycles = [
    ['Monthly', 'Pay monthly'],
    ['Annual', 'Save 20%'],
  ] as const;
</script>

<SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
  <SegmentGroupIndicator />
  {#each billingCycles as [item, description] (item)}
    <SegmentGroupItem class={styles.item} value={item}>
      {#snippet asChild(props)}
        <label {...props()}>
          <SegmentGroupItemText class={styles.title}>{item}</SegmentGroupItemText>
          <span class={styles.description}>{description}</span>
          <SegmentGroupItemHiddenInput />
        </label>
      {/snippet}
    </SegmentGroupItem>
  {/each}
</SegmentGroup>