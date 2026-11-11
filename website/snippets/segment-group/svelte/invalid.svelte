<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItems,
  } from '@moduix/svelte/segment-group';

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];
</script>

<SegmentGroup aria-label="Framework" name="framework" defaultValue="React" invalid required>
  <SegmentGroupIndicator />
  <SegmentGroupItems items={frameworks} />
</SegmentGroup>