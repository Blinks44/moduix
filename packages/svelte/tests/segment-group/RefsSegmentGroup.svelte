<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItem,
    SegmentGroupItemHiddenInput,
    SegmentGroupItemText,
    SegmentGroupLabel,
  } from '@/components/segment-group';

  const refs: Record<'root' | 'label' | 'item' | 'text' | 'indicator', Element | null> = $state({
    root: null,
    label: null,
    item: null,
    text: null,
    indicator: null,
  });

  export const getRefs = () => refs;
</script>

<SegmentGroup
  bind:ref={refs.root}
  defaultValue="React"
  aria-label="Framework"
  data-probe="root"
  class="custom-root"
>
  <SegmentGroupLabel bind:ref={refs.label}>Framework</SegmentGroupLabel>
  <SegmentGroupIndicator bind:ref={refs.indicator} class="custom-indicator" />
  <SegmentGroupItem bind:ref={refs.item} value="React" class="custom-item">
    <SegmentGroupItemHiddenInput />
    <SegmentGroupItemText bind:ref={refs.text}>React</SegmentGroupItemText>
  </SegmentGroupItem>
</SegmentGroup>