<script lang="ts">
  import { SegmentGroup } from '@/components/segment-group';
  import SegmentOptions from './SegmentOptions.svelte';
</script>

<SegmentGroup orientation="vertical" defaultValue="React" aria-label="Framework">
  <SegmentOptions />
</SegmentGroup>