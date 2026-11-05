<script lang="ts">
  import { SegmentGroup, SegmentGroupItems } from '@/components/segment-group';
</script>

<form data-testid="form">
  <SegmentGroup name="framework" defaultValue="Solid" aria-label="Framework">
    <SegmentGroupItems items={['React', 'Solid']} />
  </SegmentGroup>
</form>