<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItems,
  } from '@moduix/svelte/segment-group';
  import { Stack } from '@moduix/svelte/stack';

  const sizes = ['sm', 'md', 'lg'] as const;
  const frameworks = ['React', 'Solid', 'Vue'];
</script>

<Stack align="center" gap="3">
  {#each sizes as size (size)}
    <SegmentGroup {size} aria-label={`Framework, ${size}`} defaultValue="React">
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworks} />
    </SegmentGroup>
  {/each}
</Stack>