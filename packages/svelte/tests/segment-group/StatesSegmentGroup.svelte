<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupItem,
    SegmentGroupItemHiddenInput,
    SegmentGroupItemText,
  } from '@/components/segment-group';
</script>

<SegmentGroup disabled aria-label="Disabled framework">
  <SegmentGroupItem value="React">
    <SegmentGroupItemText>Disabled option</SegmentGroupItemText><SegmentGroupItemHiddenInput />
  </SegmentGroupItem>
</SegmentGroup>
<SegmentGroup readOnly aria-label="Read-only framework">
  <SegmentGroupItem value="React">
    <SegmentGroupItemText>Read-only option</SegmentGroupItemText><SegmentGroupItemHiddenInput />
  </SegmentGroupItem>
</SegmentGroup>
<SegmentGroup invalid required aria-label="Required framework">
  <SegmentGroupItem value="React">
    <SegmentGroupItemText>Required option</SegmentGroupItemText><SegmentGroupItemHiddenInput />
  </SegmentGroupItem>
</SegmentGroup>