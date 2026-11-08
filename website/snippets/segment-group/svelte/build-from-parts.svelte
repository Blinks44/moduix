<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItem,
    SegmentGroupItemHiddenInput,
    SegmentGroupItemText,
  } from '@moduix/svelte/segment-group';

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];
</script>

<SegmentGroup aria-label="Framework" defaultValue="React">
  <SegmentGroupIndicator />
  {#each frameworks as framework (framework)}
    <SegmentGroupItem value={framework}>
      <SegmentGroupItemText>{framework}</SegmentGroupItemText>
      <SegmentGroupItemHiddenInput />
    </SegmentGroupItem>
  {/each}
</SegmentGroup>