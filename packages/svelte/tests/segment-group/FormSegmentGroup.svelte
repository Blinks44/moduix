<script lang="ts">
  import { SegmentGroup, SegmentGroupIndicator } from '@/components/segment-group';
  import SegmentOptions from './SegmentOptions.svelte';
</script>

<form data-testid="form">
  <SegmentGroup defaultValue="React" name="framework" aria-label="Framework">
    <SegmentGroupIndicator />
    <SegmentOptions />
  </SegmentGroup>
</form>