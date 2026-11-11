<script lang="ts">
  import { SegmentGroup, SegmentGroupItems } from '@/components/segment-group';
</script>

{#snippet solid()}<em data-testid="rich-label">Solid</em>{/snippet}

<SegmentGroup defaultValue="React" aria-label="Framework">
  <SegmentGroupItems
    items={[
      { value: 'React', label: 'React' },
      { value: 'Solid', label: solid, disabled: true },
    ]}
  />
</SegmentGroup>