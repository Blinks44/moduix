<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItem,
    SegmentGroupItemHiddenInput,
    SegmentGroupItemText,
    SegmentGroupLabel,
  } from '@/components/segment-group';

  let rootRef: Element | null = $state(null);
  let itemRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, itemRef });
</script>

<SegmentGroup
  bind:ref={rootRef}
  defaultValue="React"
  aria-label="Framework"
  class="gap-4 border-primary"
>
  <SegmentGroupLabel>Framework</SegmentGroupLabel>
  <SegmentGroupIndicator class="bg-primary" />
  <SegmentGroupItem
    bind:ref={itemRef}
    value="React"
    class="data-[state=checked]:text-primary-foreground"
  >
    <SegmentGroupItemText>React</SegmentGroupItemText>
    <SegmentGroupItemHiddenInput />
  </SegmentGroupItem>
</SegmentGroup>