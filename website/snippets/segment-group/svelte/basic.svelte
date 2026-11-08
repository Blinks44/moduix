<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItems,
  } from '@moduix/svelte/segment-group';

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];
</script>

<SegmentGroup aria-label="Framework" defaultValue="React">
  <SegmentGroupIndicator />
  <SegmentGroupItems items={frameworks} />
</SegmentGroup>