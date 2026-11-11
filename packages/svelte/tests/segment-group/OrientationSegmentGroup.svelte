<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupRootProvider,
    useSegmentGroup,
  } from '@/components/segment-group';
  import SegmentOptions from './SegmentOptions.svelte';

  const segmentGroup = useSegmentGroup({ defaultValue: 'React' });
</script>

<SegmentGroup defaultValue="React" aria-label="Root" data-testid="root">
  <SegmentOptions />
</SegmentGroup>
<SegmentGroupRootProvider value={segmentGroup} aria-label="Provider" data-testid="provider">
  <SegmentOptions />
</SegmentGroupRootProvider>