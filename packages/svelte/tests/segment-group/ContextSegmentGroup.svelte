<script lang="ts">
  import {
    SegmentGroupIndicator,
    SegmentGroupItem,
    SegmentGroupItemHiddenInput,
    SegmentGroupItemText,
    SegmentGroupRootProvider,
    useSegmentGroup,
  } from '@/components/segment-group';
  import ItemState from './ItemState.svelte';

  const segmentGroup = useSegmentGroup({ defaultValue: 'React' });
</script>

<SegmentGroupRootProvider value={segmentGroup} aria-label="Framework">
  <button type="button" onclick={() => segmentGroup().setValue('Solid')}>Select</button>
  <SegmentGroupIndicator />
  <SegmentGroupItem value="React">
    <SegmentGroupItemText>React <ItemState /></SegmentGroupItemText>
    <SegmentGroupItemHiddenInput />
  </SegmentGroupItem>
  <SegmentGroupItem value="Solid">
    <SegmentGroupItemText>Solid</SegmentGroupItemText>
    <SegmentGroupItemHiddenInput />
  </SegmentGroupItem>
</SegmentGroupRootProvider>