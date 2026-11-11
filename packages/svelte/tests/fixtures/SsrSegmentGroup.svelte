<script lang="ts">
  import { SegmentGroup } from '@/components/segment-group';
  import SegmentOptions from '../segment-group/SegmentOptions.svelte';
</script>

<SegmentGroup defaultValue="React" name="framework" aria-label="Framework">
  <SegmentOptions />
</SegmentGroup>