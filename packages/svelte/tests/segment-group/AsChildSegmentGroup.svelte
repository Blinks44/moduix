<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItem,
    SegmentGroupItemHiddenInput,
    SegmentGroupItemText,
  } from '@/components/segment-group';
</script>

<SegmentGroup defaultValue="Monthly" aria-label="Billing cycle">
  <SegmentGroupIndicator data-testid="indicator" />
  <SegmentGroupItem value="Monthly">
    {#snippet asChild(props)}
      <label {...props()} data-testid="monthly">
        <SegmentGroupItemText>Monthly</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </label>
    {/snippet}
  </SegmentGroupItem>
  <SegmentGroupItem value="Annual">
    {#snippet asChild(props)}
      <label {...props()} data-testid="annual">
        <SegmentGroupItemText>Annual</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </label>
    {/snippet}
  </SegmentGroupItem>
</SegmentGroup>