<script lang="ts">
  import { SegmentGroup, SegmentGroupItems } from '@/components/segment-group';

  let value: string | null = $state('React');
</script>

<button type="button" onclick={() => (value = 'Solid')}>Set Solid</button>
<SegmentGroup bind:value aria-label="Framework">
  <SegmentGroupItems
    items={[
      { value: 'React', label: 'React' },
      { value: 'Solid', label: 'Solid' },
    ]}
  />
</SegmentGroup>